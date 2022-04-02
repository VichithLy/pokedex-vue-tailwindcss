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
  SET_POKEMONS_BY_NAME_DESC,
  SET_POKEMONS_BY_NAME_ASC,
  SET_POKEMONS_BY_ID_ASC,
  SET_POKEMONS_BY_ID_DESC,
  SORT_POKEMONS,
  UPDATE_FILTERED_POKEMONS_ORDER,
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
  sortPokemonsByIdAscUsingUrl,
  sortPokemonsByIdDescUsingUrl,
} from "../../utils";
import {
  enum_sort,
  enum_status,
  enum_key,
  enum_order,
  enum_type,
  enum_region,
} from "../../constants/enums";

import merge from "lodash.merge";

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
        sorting: {
          key: enum_key.ID,
          key_value: "",
          region: enum_region.NONE,
          types: enum_type.NONE,
          order: enum_order.ASC,
        },
        status: enum_status.NONE,
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
    [UPDATE_FILTERED_POKEMONS_ORDER](state, value) {
      state.filteredPokemons.sorting.order = value;
    },
    [SET_SELECTED_POKEMON_NAME](state, name) {
      state.selectedPokemonName = name;
    },
    [SET_ALL_POKEMONS](state, payload) {
      state.allPokemons.count = payload.count;
      state.allPokemons.results = payload.results;
    },
    [ADD_POKEMONS](state, payload) {
      state.filteredPokemons.sorting.key_value = "";
      state.filteredPokemons.sorting.types = [];
      state.filteredPokemons.sorting.region = enum_region.NONE;

      state.filteredPokemons.sorting.types = [];
      state.filteredPokemons.sorting = merge(
        state.filteredPokemons.sorting,
        payload.sorting,
      );

      state.filteredPokemons.status = payload.status;
      state.filteredPokemons.count += payload.count;
      state.filteredPokemons.results = [
        ...state.filteredPokemons.results,
        ...payload.results,
      ];
    },
    [UPDATE_FILTERED_POKEMONS](state, payload) {
      state.filteredPokemons.status = payload.status;
      state.filteredPokemons.count = payload.count;

      const results = state.filteredPokemons.results;
      results.splice(0, results.length, ...payload.results);
    },
    [RESET_FILTERED_POKEMONS](state) {
      state.filteredPokemons.status = enum_status.NONE;
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
    [SET_ALL_POKEMONS]({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getAllPokemons()
          .then((response) => {
            const payload = {
              count: response.data.count - 1, // There are actually 1126-1 Pokemons
              results: response.data.results,
            };

            commit(SET_ALL_POKEMONS, payload);
            dispatch(SORT_POKEMONS);

            commit(UPDATE_IS_LOADING, false);
            resolve(payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async [GET_POKEMONS](
      { commit, state },

      sorting = {
        key: enum_key.ID,
        key_value: "",
        region: enum_region.NONE,
        types: enum_type.NONE,
        order: enum_sort.ASC,
      },
    ) {
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
      if (state.filteredPokemons.status === enum_status.CANNOT_LOAD_MORE) {
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
          let payload_status = enum_status.NONE;
          let payload_results_number = results_number;

          // We can display more Pokemons
          if (all_pokemons_count - filtered_pokemons_count > results_number) {
            payload_status = enum_status.CAN_LOAD_MORE;
          }

          // We can display the last Pokemons
          if (all_pokemons_count - filtered_pokemons_count < results_number) {
            payload_status = enum_status.CANNOT_LOAD_MORE;
            payload_results_number =
              all_pokemons_count - filtered_pokemons_count;
          }

          // If no results to display
          if (all_pokemons_count === 0) {
            payload_status = enum_status.NO_RESULTS;
          }

          payload = {
            sorting: sorting,
            status: payload_status,
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
      const results = state.allPokemons.results;
      const count = state.allPokemons.count;
      const payload = { count, results };

      const sortingKey = state.filteredPokemons.sorting.key;
      const sortingOrder = state.filteredPokemons.sorting.order;

      console.log("sortingKey", sortingKey);
      console.log("sortingOrder", sortingOrder);

      switch (sortingKey) {
        case enum_key.NAME:
          switch (sortingOrder) {
            case enum_order.ASC:
              commit(SET_ALL_POKEMONS, {
                count,
                results: sortPokemonsByNameAsc(results),
              });
              break;

            case enum_order.DESC:
              commit(SET_ALL_POKEMONS, {
                count,
                results: sortPokemonsByNameDesc(results),
              });
              break;

            default:
              break;
          }
          break;

        case enum_key.ID:
          switch (sortingOrder) {
            case enum_order.ASC:
              commit(SET_ALL_POKEMONS, {
                count,
                results: sortPokemonsByIdAscUsingUrl(results),
              });
              break;

            case enum_order.DESC:
              commit(SET_ALL_POKEMONS, {
                count,
                results: sortPokemonsByIdDescUsingUrl(results),
              });
              break;

            default:
              break;
          }
          break;

        default:
          commit(SET_ALL_POKEMONS, payload);
          break;
      }
    },
    [SET_POKEMONS_BY_NAME_DESC]({ state, commit, dispatch }) {
      const allPokemons = state.allPokemons.results;
      const sortedPokemons = sortPokemonsByNameDesc(allPokemons);

      const payload = {
        count: sortedPokemons.length,
        results: sortedPokemons,
      };

      const sorting = {
        ...state.filteredPokemons.sorting,
        key: enum_key.NAME,
        order: enum_order.DESC,
      };

      commit(SET_ALL_POKEMONS, payload);
      commit(RESET_FILTERED_POKEMONS);
      // Display sorted Pokemons
      dispatch(GET_POKEMONS, sorting);

      commit(UPDATE_FILTERED_POKEMONS_ORDER, enum_order.DESC);
    },
    [SET_POKEMONS_BY_NAME_ASC]({ state, commit, dispatch }) {
      const allPokemons = state.allPokemons.results;
      const sortedPokemons = sortPokemonsByNameAsc(allPokemons);

      const payload = {
        count: sortedPokemons.length,
        results: sortedPokemons,
      };

      const sorting = {
        ...state.filteredPokemons.sorting,
        key: enum_key.NAME,
        order: enum_order.ASC,
      };

      commit(SET_ALL_POKEMONS, payload);
      commit(RESET_FILTERED_POKEMONS);
      dispatch(GET_POKEMONS, sorting);

      commit(UPDATE_FILTERED_POKEMONS_ORDER, enum_order.ASC);
    },
    [SET_POKEMONS_BY_ID_ASC]({ state, commit, dispatch }) {
      const allPokemons = state.allPokemons.results;
      const sortedPokemons = sortPokemonsByIdAscUsingUrl(allPokemons);

      const payload = {
        count: sortedPokemons.length,
        results: sortedPokemons,
      };

      const sorting = {
        ...state.filteredPokemons.sorting,
        key: enum_key.ID,
        order: enum_order.ASC,
      };

      commit(SET_ALL_POKEMONS, payload);
      commit(RESET_FILTERED_POKEMONS);
      dispatch(GET_POKEMONS, sorting);

      commit(UPDATE_FILTERED_POKEMONS_ORDER, enum_order.ASC);
    },
    [SET_POKEMONS_BY_ID_DESC]({ state, commit, dispatch }) {
      const allPokemons = state.allPokemons.results;
      const sortedPokemons = sortPokemonsByIdDescUsingUrl(allPokemons);

      const payload = {
        count: sortedPokemons.length,
        results: sortedPokemons,
      };

      const sorting = {
        ...state.filteredPokemons.sorting,
        key: enum_key.ID,
        order: enum_order.DESC,
      };

      commit(SET_ALL_POKEMONS, payload);
      commit(RESET_FILTERED_POKEMONS);
      dispatch(GET_POKEMONS, sorting);
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

        const sorting = {
          key_value: state.searchedPokemon,
        };

        commit(RESET_FILTERED_POKEMONS);

        commit(SET_ALL_POKEMONS, payload);
        dispatch(SORT_POKEMONS);

        dispatch(GET_POKEMONS, sorting);
      });
    },

    async [SET_POKEMONS_BY_REGION]({ commit, dispatch, rootState }) {
      const selectedRegion = rootState.sorting.selectedRegion;

      getPokemonByRegion(selectedRegion).then((pokemons_by_region) => {
        const payload = {
          count: pokemons_by_region.length,
          results: pokemons_by_region,
        };

        const sorting = {
          region: enum_region[selectedRegion.toUpperCase()],
        };

        commit(SET_ALL_POKEMONS, payload);
        dispatch(SORT_POKEMONS);
        commit(RESET_FILTERED_POKEMONS);

        dispatch(GET_POKEMONS, sorting);
      });
    },

    async [SET_POKEMONS_BY_TYPES]({ commit, dispatch, rootState }) {
      const selectedTypes = rootState.sorting.selectedTypes;

      getPokemonsByTypes(selectedTypes).then((pokemons_by_types) => {
        const payload = {
          count: pokemons_by_types.length,
          results: pokemons_by_types,
        };

        const typesEnum = selectedTypes.map((type) => {
          return enum_type[type.toUpperCase()];
        });

        const sorting = {
          types: typesEnum,
        };

        commit(RESET_FILTERED_POKEMONS);

        commit(SET_ALL_POKEMONS, payload);
        dispatch(SORT_POKEMONS);
        dispatch(GET_POKEMONS, sorting);
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

            const typesEnum = selectedTypes.map((type) => {
              return enum_type[type.toUpperCase()];
            });

            const sorting = {
              region: enum_region[selectedRegion.toUpperCase()],
              types: typesEnum,
            };

            commit(RESET_FILTERED_POKEMONS);

            commit(SET_ALL_POKEMONS, payload);
            dispatch(SORT_POKEMONS);
            dispatch(GET_POKEMONS, sorting);
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

                const sorting = {
                  key_value: searchedPokemon,
                  types: selectedTypes.map(
                    (type) => enum_type[type.toUpperCase()],
                  ),
                };

                commit(RESET_FILTERED_POKEMONS);
                commit(SET_ALL_POKEMONS, payload);
                dispatch(SORT_POKEMONS);
                dispatch(GET_POKEMONS, sorting);
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
              console.log("I M HERE");

              const payload = {
                count: results.length,
                results: results,
              };

              const sorting = {
                key_value: searchedPokemon,
                region: enum_region[selectedRegion.toUpperCase()],
              };

              commit(RESET_FILTERED_POKEMONS);
              commit(SET_ALL_POKEMONS, payload);
              dispatch(SORT_POKEMONS);
              dispatch(GET_POKEMONS, sorting);
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
              const payload = {
                count: results.length,
                results: results,
              };

              const sorting = {
                region: enum_region[selectedRegion.toUpperCase()],
                types: selectedTypes.map(
                  (type) => enum_type[type.toUpperCase()],
                ),
                key_value: searchedPokemon,
              };

              commit(RESET_FILTERED_POKEMONS);
              commit(SET_ALL_POKEMONS, payload);
              dispatch(SORT_POKEMONS);
              dispatch(GET_POKEMONS, sorting);
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
