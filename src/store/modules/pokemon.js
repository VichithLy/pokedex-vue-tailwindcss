import { UPDATE_SEARCHED_POKEMON } from "@/store/mutation-action-types";
import { UPDATE_SELECTED_POKEMON } from "@/store/mutation-action-types";
import {
  SET_ALL_POKEMONS,
  GET_POKEMONS,
  ADD_POKEMONS,
  SET_SELECTED_POKEMON,
  UPDATE_FILTERED_POKEMONS,
  SET_POKEMONS_BY_REGION,
  SET_POKEMONS_BY_TYPES,
  RESET_FILTERED_POKEMONS,
  SET_POKEMONS_BY_REGION_AND_TYPES,
  SET_POKEMONS_BY_NAME_OR_ID,
  SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID,
  SET_SELECTED_POKEMON_NAME,
  UPDATE_IS_LOADING,
  UPDATE_IS_SORTED_BY_2,
  SET_POKEMONS_BY_NAME_DESC,
  SET_POKEMONS_BY_NAME_ASC,
  SET_POKEMONS_BY_ID_ASC,
  SET_POKEMONS_BY_ID_DESC,
  SORT_POKEMONS,
} from "../mutation-action-types";
import {
  getAllPokemons,
  getPokemonByName,
  makeConcurrentRequests,
  getDataFromUrl,
} from "../../services/PokeAPI";
import {
  getRecursiveEvolution,
  createPokemonForDetailedCard,
  createPokemonForSimpleCard,
  getPokemonByRegion,
  getPokemonsByTypes,
  filterPokemonsByNameOrId,
  getPokemonsByRegionAndTypes,
  getPokemonsByRegionAndNameOrId,
  getPokemonsByTypesAndNameOrId,
  getPokemonsByRegionAndTypesAndNameOrId,
  findEnglishFlavorText,
  escapeSpecialChars,
  sortPokemonsByNameDesc,
  sortPokemonsByNameAsc,
  sortPokemonsByIdAsc,
  sortPokemonsByIdDesc,
} from "../../utils";
import { sort, status } from "../../constants/types";

export default {
  namespaced: true,

  state() {
    return {
      searchedPokemon: "",
      selectedPokemonName: "",
      selectedPokemon: {},
      // ! Set to 0 when dev
      resultsNumber: 10,
      // All existing Pokemons in the API or sorted Pokemons
      allPokemons: { count: 0, results: [] },
      // Pokemons that will be displayed on the screen
      filteredPokemons: {
        status: status.NONE,
        isSortedBy: sort.NONE,
        isSortedBy2: sort.ID_ASC,
        count: 0,
        results: [],
      },
      isLoading: false,
    };
  },

  mutations: {
    [UPDATE_IS_LOADING](state, value) {
      state.isLoading = value;
    },
    [UPDATE_SEARCHED_POKEMON](state, searchedPokemon) {
      state.searchedPokemon = searchedPokemon;
    },
    [UPDATE_SELECTED_POKEMON](state, pokemon) {
      state.selectedPokemon = pokemon;
    },
    [UPDATE_IS_SORTED_BY_2](state, value) {
      state.filteredPokemons.isSortedBy2 = value;
    },
    [SET_SELECTED_POKEMON_NAME](state, name) {
      state.selectedPokemonName = name;
    },
    [SET_ALL_POKEMONS](state, payload) {
      state.allPokemons.count = payload.count;
      state.allPokemons.results = payload.results;
    },
    [ADD_POKEMONS](state, payload) {
      state.filteredPokemons.status = payload.status;
      state.filteredPokemons.isSortedBy = payload.isSortedBy;
      state.filteredPokemons.count += payload.count;
      state.filteredPokemons.results = [
        ...state.filteredPokemons.results,
        ...payload.results,
      ];
    },
    [UPDATE_FILTERED_POKEMONS](state, payload) {
      state.filteredPokemons.status = payload.status;
      state.filteredPokemons.isSortedBy = payload.isSortedBy;
      state.filteredPokemons.count = payload.count;

      const results = state.filteredPokemons.results;
      results.splice(0, results.length, ...payload.results);
    },
    [RESET_FILTERED_POKEMONS](state) {
      state.filteredPokemons.status = status.NONE;
      state.filteredPokemons.isSortedBy = sort.NONE;
      state.filteredPokemons.count = 0;
      state.filteredPokemons.results = [];
    },
  },

  actions: {
    [UPDATE_SEARCHED_POKEMON]({ commit }, searchedPokemon) {
      commit(UPDATE_SEARCHED_POKEMON, searchedPokemon);
    },
    [UPDATE_SELECTED_POKEMON]({ commit }, pokemon) {
      commit(UPDATE_SELECTED_POKEMON, pokemon);
    },
    [SET_SELECTED_POKEMON_NAME]({ commit }, name) {
      commit(SET_SELECTED_POKEMON_NAME, name);
    },
    [UPDATE_IS_LOADING]({ commit }, value) {
      commit(UPDATE_IS_LOADING, value);
    },
    [SET_ALL_POKEMONS]({ commit }) {
      return new Promise((resolve, reject) => {
        getAllPokemons()
          .then((response) => {
            const payload = {
              count: response.data.count - 1, // There are actually 1126 - 1 Pokemons
              results: response.data.results,
            };

            commit(SET_ALL_POKEMONS, payload);

            commit(UPDATE_IS_LOADING, false);
            resolve(payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async [GET_POKEMONS]({ commit, state }, sortedBy = sort.NONE) {
      commit(UPDATE_IS_LOADING, true);

      const filtered_pokemons_count = state.filteredPokemons.count;
      const all_pokemons_count = state.allPokemons.count;

      const results_number = state.resultsNumber;

      const begin = filtered_pokemons_count;
      const end = begin + results_number;

      const pokemons_to_display = state.allPokemons.results.slice(begin, end);

      let results = [];
      let payload = { status: "", count: 0, result: [] };

      // There is no more Pokemons to display
      if (state.filteredPokemons.status === status.CANNOT_LOAD_MORE) {
        return;
      }

      makeConcurrentRequests(
        pokemons_to_display.map((pokemon) => getDataFromUrl(pokemon.url)),
      )
        .then((responses) => {
          results = responses.map((pokemon) =>
            createPokemonForSimpleCard(pokemon),
          );
        })
        .then(() => {
          let payload_status = status.NONE;
          let payload_results_number = results_number;

          // We can display more Pokemons
          if (all_pokemons_count - filtered_pokemons_count > results_number) {
            payload_status = status.CAN_LOAD_MORE;
          }

          // We can display the last Pokemons
          if (all_pokemons_count - filtered_pokemons_count < results_number) {
            payload_status = status.CANNOT_LOAD_MORE;
            payload_results_number =
              all_pokemons_count - filtered_pokemons_count;
          }

          payload = {
            status: payload_status,
            isSortedBy: sortedBy,
            count: payload_results_number,
            results: results,
          };

          commit(ADD_POKEMONS, payload);
          commit(UPDATE_IS_LOADING, false);
        });
    },

    async [SET_SELECTED_POKEMON]({ commit }, name) {
      commit(UPDATE_IS_LOADING, true);

      return new Promise((resolve, reject) => {
        getPokemonByName(name)
          .then((response) => {
            const pokemon = response.data;
            const species_url = pokemon.species.url;

            // Get the species
            getDataFromUrl(species_url).then((response) => {
              const species = response.data;

              // About
              const about = escapeSpecialChars(
                findEnglishFlavorText(species.flavor_text_entries),
              );

              // Evolution
              const evolution_chain_url = species.evolution_chain.url;

              // Get the evolution chain
              getDataFromUrl(evolution_chain_url).then((response) => {
                let evolution_chain = [];
                getRecursiveEvolution(response.data.chain, evolution_chain);

                // Create the Pokemon object used in the DetailedCard component
                const pokemonObject = createPokemonForDetailedCard(
                  pokemon,
                  about,
                  evolution_chain,
                );

                commit(UPDATE_SELECTED_POKEMON, pokemonObject);
                commit(UPDATE_IS_LOADING, false);
                resolve(pokemonObject);
              });
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     * ! ==================================
     * ! ======== Sorting section =========
     * ! ==================================
     * */
    [SORT_POKEMONS]({ commit, state }) {
      const isSortedBy2 = state.filteredPokemons.isSortedBy2;
      const results = state.allPokemons.results;
      const count = state.allPokemons.count;
      const payload = { count, results };

      switch (isSortedBy2) {
        case sort.NAME_ASC:
          commit(SET_ALL_POKEMONS, {
            count,
            results: sortPokemonsByNameAsc(results),
          });
          break;
        case sort.NAME_DESC:
          commit(SET_ALL_POKEMONS, {
            count,
            results: sortPokemonsByNameDesc(results),
          });
          break;
        case sort.ID_ASC:
          commit(SET_ALL_POKEMONS, {
            count,
            results: sortPokemonsByIdAsc(results),
          });
          break;
        case sort.ID_DESC:
          console.log("ID_DESC");
          commit(SET_ALL_POKEMONS, {
            count,
            results: sortPokemonsByIdDesc(results),
          });
          break;

        default:
          commit(SET_ALL_POKEMONS, payload);
          break;
      }
    },
    [SET_POKEMONS_BY_NAME_DESC]({ state, commit, dispatch }) {
      const allPokemons = state.allPokemons.results;
      const currentIsSortedBy = state.filteredPokemons.isSortedBy;
      const sortedPokemons = sortPokemonsByNameDesc(allPokemons);

      const payload = {
        count: sortedPokemons.length,
        results: sortedPokemons,
      };
      commit(SET_ALL_POKEMONS, payload);

      commit(RESET_FILTERED_POKEMONS);
      // Display sorted Pokemons
      dispatch(GET_POKEMONS, currentIsSortedBy);
      // Update isSortedBy2
      commit(UPDATE_IS_SORTED_BY_2, sort.NAME_DESC);
    },
    [SET_POKEMONS_BY_NAME_ASC]({ state, commit, dispatch }) {
      const allPokemons = state.allPokemons.results;
      const currentIsSortedBy = state.filteredPokemons.isSortedBy;
      const sortedPokemons = sortPokemonsByNameAsc(allPokemons);

      const payload = {
        count: sortedPokemons.length,
        results: sortedPokemons,
      };

      commit(SET_ALL_POKEMONS, payload);
      commit(RESET_FILTERED_POKEMONS);
      dispatch(GET_POKEMONS, currentIsSortedBy);
      commit(UPDATE_IS_SORTED_BY_2, sort.NAME_ASC);
    },
    [SET_POKEMONS_BY_ID_ASC]({ state, commit, dispatch }) {
      const allPokemons = state.allPokemons.results;
      const currentIsSortedBy = state.filteredPokemons.isSortedBy;
      const sortedPokemons = sortPokemonsByIdAsc(allPokemons);

      const payload = {
        count: sortedPokemons.length,
        results: sortedPokemons,
      };

      commit(SET_ALL_POKEMONS, payload);
      commit(RESET_FILTERED_POKEMONS);
      dispatch(GET_POKEMONS, currentIsSortedBy);
      commit(UPDATE_IS_SORTED_BY_2, sort.ID_ASC);
    },
    [SET_POKEMONS_BY_ID_DESC]({ state, commit, dispatch }) {
      const allPokemons = state.allPokemons.results;
      const currentIsSortedBy = state.filteredPokemons.isSortedBy;
      const sortedPokemons = sortPokemonsByIdDesc(allPokemons);

      const payload = {
        count: sortedPokemons.length,
        results: sortedPokemons,
      };

      commit(SET_ALL_POKEMONS, payload);
      commit(RESET_FILTERED_POKEMONS);
      dispatch(GET_POKEMONS, currentIsSortedBy);
      commit(UPDATE_IS_SORTED_BY_2, sort.ID_DESC);
    },
    async [SET_POKEMONS_BY_NAME_OR_ID]({ state, commit, dispatch }) {
      dispatch(SET_ALL_POKEMONS).then(() => {
        const results = filterPokemonsByNameOrId(
          state.allPokemons.results,
          state.searchedPokemon,
        );

        const payload = {
          count: results.length,
          results,
        };

        commit(RESET_FILTERED_POKEMONS);

        commit(SET_ALL_POKEMONS, payload);
        dispatch(SORT_POKEMONS);

        results.length == 0
          ? dispatch(GET_POKEMONS, sort.NO_RESULTS)
          : dispatch(GET_POKEMONS);
      });
    },

    async [SET_POKEMONS_BY_REGION]({ commit, dispatch, rootState }) {
      commit(UPDATE_IS_LOADING, true);

      getPokemonByRegion(rootState.sorting.selectedRegion).then(
        (pokemons_by_region) => {
          const payload = {
            count: pokemons_by_region.length,
            results: pokemons_by_region,
          };

          commit(SET_ALL_POKEMONS, payload);
          dispatch(SORT_POKEMONS);

          commit(RESET_FILTERED_POKEMONS);

          pokemons_by_region.length == 0
            ? dispatch(GET_POKEMONS, sort.NO_RESULTS)
            : dispatch(GET_POKEMONS, sort.REGION);
        },
      );
    },

    async [SET_POKEMONS_BY_TYPES]({ commit, dispatch, rootState }) {
      const selectedTypes = rootState.sorting.selectedTypes;

      getPokemonsByTypes(selectedTypes).then((pokemons_by_types) => {
        const payload = {
          count: pokemons_by_types.length,
          results: pokemons_by_types,
        };
        commit(RESET_FILTERED_POKEMONS);

        commit(SET_ALL_POKEMONS, payload);
        dispatch(SORT_POKEMONS);

        pokemons_by_types.length == 0
          ? dispatch(GET_POKEMONS, sort.NO_RESULTS)
          : dispatch(GET_POKEMONS, sort.TYPES);
      });
    },

    async [SET_POKEMONS_BY_REGION_AND_TYPES]({ commit, dispatch, rootState }) {
      const selectedRegion = rootState.sorting.selectedRegion;
      const selectedTypes = rootState.sorting.selectedTypes;

      //! 1 selectedRegion && 0 selectedTypes
      if (selectedRegion && selectedTypes.length === 0) {
        dispatch(SET_POKEMONS_BY_REGION);
        console.log("1 selectedRegion && 0 selectedTypes");
      }

      //!  0 selectedRegion && 1 or 2 selectedTypes
      else if (!selectedRegion && selectedTypes.length > 0) {
        console.log("0 selectedRegion && 1 or 2 selectedTypes");
        dispatch(SET_POKEMONS_BY_TYPES);
      }

      //! 1 selectedRegion && 1 or 2 selectedTypes
      else if (selectedRegion && selectedTypes.length > 0) {
        console.log("1 selectedRegion && 1 or 2 selectedTypes");

        getPokemonsByRegionAndTypes(selectedRegion, selectedTypes).then(
          (pokemons_by_region_and_types) => {
            const payload = {
              count: pokemons_by_region_and_types.length,
              results: pokemons_by_region_and_types,
            };

            commit(RESET_FILTERED_POKEMONS);

            commit(SET_ALL_POKEMONS, payload);
            dispatch(SORT_POKEMONS);

            pokemons_by_region_and_types.length == 0
              ? dispatch(GET_POKEMONS, sort.NO_RESULTS)
              : dispatch(GET_POKEMONS, [sort.REGION, sort.TYPES]);
          },
        );
      }
    },

    async [SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID]({
      state,
      rootState,
      dispatch,
      commit,
    }) {
      const searchedPokemon = state.searchedPokemon;
      const selectedRegion = rootState.sorting.selectedRegion;
      const selectedTypes = rootState.sorting.selectedTypes;

      //! Case 1 : searchedPokemon
      if (searchedPokemon) {
        console.log("CASE 1");
        //! Case 1.1 : !selectedRegion &&
        if (!selectedRegion) {
          console.log("CASE 1.1");
          //! Case 1.1.1 : 0 selectedTypes
          if (selectedTypes.length == 0) {
            console.log("CASE 1.1.1");
            dispatch(SET_POKEMONS_BY_NAME_OR_ID);
          }
          //! Case 1.1.2 : 1 or 2 selectedTypes
          if (selectedTypes.length > 0) {
            console.log("CASE 1.1.2");
            getPokemonsByTypesAndNameOrId(selectedTypes, searchedPokemon).then(
              (results) => {
                console.log(results);

                const payload = {
                  count: results.length,
                  results: results,
                };

                commit(RESET_FILTERED_POKEMONS);
                // TODO Check isSortedBy2
                commit(SET_ALL_POKEMONS, payload);
                dispatch(SORT_POKEMONS);

                results.length == 0
                  ? dispatch(GET_POKEMONS, sort.NO_RESULTS)
                  : dispatch(GET_POKEMONS, [sort.REGION]);
              },
            );
          }
        }
        //! Case 1.2 : selectedRegion && 1 or 2 selectedTypes
        if (selectedRegion) {
          console.log("CASE 1.2");
          //! Case 1.2.1 : 0 selectedTypes
          if (selectedTypes.length == 0) {
            console.log("CASE 1.2.1");
            getPokemonsByRegionAndNameOrId(
              selectedRegion,
              searchedPokemon,
            ).then((results) => {
              console.log(results);

              const payload = {
                count: results.length,
                results: results,
              };

              commit(RESET_FILTERED_POKEMONS);

              commit(SET_ALL_POKEMONS, payload);
              dispatch(SORT_POKEMONS);

              results.length == 0
                ? dispatch(GET_POKEMONS, sort.NO_RESULTS)
                : dispatch(GET_POKEMONS, [sort.REGION]);
            });
          }
          //! Case 1.2.2 : 1 or 2 selectedTypes
          if (selectedTypes.length > 0) {
            console.log("CASE 1.2.2");
            getPokemonsByRegionAndTypesAndNameOrId(
              selectedRegion,
              selectedTypes,
              searchedPokemon,
            ).then((results) => {
              console.log(results);

              const payload = {
                count: results.length,
                results: results,
              };

              commit(RESET_FILTERED_POKEMONS);

              commit(SET_ALL_POKEMONS, payload);
              dispatch(SORT_POKEMONS);

              results.length == 0
                ? dispatch(GET_POKEMONS, sort.NO_RESULTS)
                : dispatch(GET_POKEMONS, [sort.REGION, sort.TYPES]);
            });
          }
        }
      }

      //! Case 2 : !searchedPokemon
      if (!searchedPokemon) {
        console.log("CASE 2");

        if (!selectedRegion && selectedTypes.length == 0) {
          console.log("CASE 2.1");

          dispatch(SET_ALL_POKEMONS).then(() => {
            commit(RESET_FILTERED_POKEMONS);
            dispatch(GET_POKEMONS);
          });
        } else {
          dispatch(SET_POKEMONS_BY_REGION_AND_TYPES);
        }
      }
    },
  },
};
