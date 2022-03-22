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
  RESET_SORTING,
  SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID,
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
} from "../../utils";
import { sort, status } from "../../constants/types";

export default {
  namespaced: true,

  state() {
    return {
      searchedPokemon: "",
      selectedPokemon: {},
      resultsNumber: 10,
      // All existing Pokemons in the API or sorted Pokemons
      allPokemons: { count: 0, results: [] },
      // Pokemons that will be displayed on the screen
      filteredPokemons: {
        status: status.NONE,
        isSortedBy: sort.NONE,
        count: 0,
        results: [],
      },
    };
  },

  mutations: {
    [UPDATE_SEARCHED_POKEMON](state, searchedPokemon) {
      state.searchedPokemon = searchedPokemon;
    },
    [UPDATE_SELECTED_POKEMON](state, pokemon) {
      state.selectedPokemon = pokemon;
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
      console.log("results", results);
      console.log("payload.results", payload.results);
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

    [SET_ALL_POKEMONS]({ commit }) {
      return new Promise((resolve, reject) => {
        getAllPokemons()
          .then((response) => {
            const payload = {
              count: response.data.count,
              results: response.data.results,
            };

            commit(SET_ALL_POKEMONS, payload);
            resolve(payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async [GET_POKEMONS]({ commit, state }, sortedBy = sort.NONE) {
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
        });
    },

    async [SET_SELECTED_POKEMON]({ commit }, name) {
      return new Promise((resolve, reject) => {
        getPokemonByName(name)
          .then((response) => {
            const pokemon = response.data;
            const species_url = pokemon.species.url;

            // Get the species
            getDataFromUrl(species_url).then((response) => {
              const species = response.data;

              // About
              const about = species.flavor_text_entries[0].flavor_text;

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
    async [SET_POKEMONS_BY_NAME_OR_ID]({ state, commit, dispatch }) {
      dispatch("sorting/" + RESET_SORTING, null, { root: true });

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
        dispatch(GET_POKEMONS);
      });
    },

    async [SET_POKEMONS_BY_REGION]({ commit, dispatch, rootState }) {
      getPokemonByRegion(rootState.sorting.selectedRegion).then(
        (pokemons_by_region) => {
          const payload = {
            count: pokemons_by_region.length,
            results: pokemons_by_region,
          };
          commit(SET_ALL_POKEMONS, payload);
          commit(RESET_FILTERED_POKEMONS);
          dispatch(GET_POKEMONS, sort.REGION);
        },
      );
    },

    async [SET_POKEMONS_BY_TYPES]({ commit, dispatch, rootState }) {
      const selectedTypes = rootState.sorting.selectedTypes;

      getPokemonsByTypes(selectedTypes).then((results) => {
        const payload = {
          count: results.length,
          results,
        };
        commit(RESET_FILTERED_POKEMONS);
        commit(SET_ALL_POKEMONS, payload);
        dispatch(GET_POKEMONS, sort.TYPES);
      });
    },

    async [SET_POKEMONS_BY_REGION_AND_TYPES]({ commit, dispatch, rootState }) {
      console.log("SET_POKEMONS_BY_REGION_AND_TYPES");
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
            dispatch(GET_POKEMONS, [sort.REGION, sort.TYPES]);
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
                commit(SET_ALL_POKEMONS, payload);
                dispatch(GET_POKEMONS, [sort.REGION]);
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
              dispatch(GET_POKEMONS, [sort.REGION]);
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
              dispatch(GET_POKEMONS, [sort.REGION, sort.TYPES]);
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
  getters: {
    /**
     *
     * @param {*} state
     * @returns a filtered array of Pokemons by name or id
     */
    matchingPokemons(state) {
      return filterPokemonsByNameOrId(
        state.allPokemons.results,
        state.searchedPokemon,
      );
    },
  },
};
