import { UPDATE_SEARCHED_POKEMON } from "@/store/mutation-types";
import { UPDATE_SELECTED_POKEMON } from "@/store/mutation-types";
import {
  SET_ALL_POKEMONS,
  GET_POKEMONS,
  ADD_POKEMONS,
  SET_SELECTED_POKEMON,
  UPDATE_FILTERED_POKEMONS,
  SET_POKEMONS_BY_REGION,
  SET_POKEMONS_BY_TYPES,
  RESET_FILTERED_POKEMONS,
} from "../mutation-types";
import {
  getAllPokemons,
  getPokemonByName,
  makeConcurrentRequests,
  getDataFromUrl,
  getRegionByName,
  getTypeByName,
} from "../../services/PokeAPI";
import {
  getPokemonsWithExactlyTwoTypes,
  getRecursiveEvolution,
} from "../../utils";
import { status, sortedBy } from "../../constants/types";

export default {
  namespaced: true,

  state() {
    return {
      searchedPokemon: "",
      selectedPokemon: {},
      resultsNumber: 10,
      // All existing Pokemons in the API
      allPokemons: { count: 0, results: [] },
      // Pokemons that will be displayed on the screen
      filteredPokemons: {
        status: status.NONE,
        isSortedBy: sortedBy.NONE,
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
      state.filteredPokemons.count = payload.count;
      state.filteredPokemons.results = payload.results;
    },
    [RESET_FILTERED_POKEMONS](state) {
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

    async [GET_POKEMONS]({ commit, state }, sortedBy) {
      const filtered_pokemons_count = state.filteredPokemons.count;
      const all_pokemons_count = state.allPokemons.count - 1;

      const results_number = state.resultsNumber;

      const begin = filtered_pokemons_count;
      const end = begin + results_number;

      const POKEMONS_TO_DISPLAY = state.allPokemons.results.slice(begin, end);

      let results = [];
      let payload = { status: "", count: 0, result: [] };

      // There is no more Pokemons to display
      if (state.filteredPokemons.status === status.CANNOT_LOAD_MORE) {
        return;
      }

      makeConcurrentRequests(
        POKEMONS_TO_DISPLAY.map((pokemon) => getDataFromUrl(pokemon.url)),
      )
        .then((response) => {
          results = response.map((pokemon) => {
            return {
              id: pokemon.data.id,
              name: pokemon.data.name,
              types: pokemon.data.types,
              picture:
                pokemon.data.sprites.other["official-artwork"].front_default,
            };
          });
        })
        .then(() => {
          // We can display more Pokemons
          if (all_pokemons_count - filtered_pokemons_count > results_number) {
            payload = {
              status: status.CAN_LOAD_MORE,
              isSortedBy: sortedBy,
              count: results_number,
              results: results,
            };

            commit(ADD_POKEMONS, payload);
          }

          // We can display the last Pokemons
          if (all_pokemons_count - filtered_pokemons_count < results_number) {
            const new_results_number =
              all_pokemons_count - filtered_pokemons_count;

            payload = {
              status: status.CANNOT_LOAD_MORE,
              isSortedBy: sortedBy,
              count: new_results_number,
              results: results,
            };

            commit(ADD_POKEMONS, payload);
          }
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
                const pokemonObject = {
                  id: pokemon.id,
                  name: pokemon.name,
                  about: about,
                  types: pokemon.types,
                  picture:
                    pokemon.sprites.other["official-artwork"].front_default,
                  weight: pokemon.weight,
                  height: pokemon.height,
                  stats: pokemon.stats,
                  abilities: pokemon.abilities,
                  evolutions: evolution_chain,
                };

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
    async [SET_POKEMONS_BY_REGION]({ commit, dispatch, rootState }) {
      getRegionByName(rootState.sorting.selectedRegion).then((response) => {
        const region = response.data;
        const region_url = region.main_generation.url;
        console.log("region_url", region_url);

        getDataFromUrl(region_url).then((response) => {
          const pokemons_species = response.data.pokemon_species;

          console.log("pokemons_species", pokemons_species);

          /**
           * ! We use getDataFromUrl() instead of getPokemonByName()
           * ! because some Pokemons need to be searched by their id
           * ! e.g.: deoxys
           */
          makeConcurrentRequests(
            pokemons_species.map((pokemon) => getDataFromUrl(pokemon.url)),
          )
            .then((response) => {
              const pokemons_by_region = response.map((pokemon) => {
                return {
                  name: pokemon.data.name,
                  url: `https://pokeapi.co/api/v2/pokemon/${pokemon.data.id}/`,
                };
              });

              console.log("pokemons_by_region", pokemons_by_region);

              const payload = {
                count: pokemons_by_region.length,
                results: pokemons_by_region,
              };
              commit(SET_ALL_POKEMONS, payload);
            })
            .then(() => {
              commit(RESET_FILTERED_POKEMONS);
              // Display Pokemons
              dispatch(GET_POKEMONS, sortedBy.TYPES);
            });
        });
      });
    },

    async [SET_POKEMONS_BY_TYPES]({ commit, dispatch, rootState }) {
      makeConcurrentRequests(
        rootState.sorting.selectedTypes.map((type) => getTypeByName(type)),
      ).then((responses) => {
        let results = [];

        //! If only one type
        if (responses.length == 1) {
          //* Get pokemon array from each response
          // console.log(responses.map((response) => response.data.pokemon));

          const response = responses[0];
          results = response.data.pokemon.map((object) => {
            let p = object.pokemon;
            return { name: p.name, url: p.url };
          });
        }

        //! If multiple types (2)
        if (responses.length > 1) {
          /**
           * We have 2 possibilities :
           * TODO - Get Pokemons with types including type1 AND type2 (vice versa)
           * - Get Pokemons with types including type1 OR type2
           */

          let pokemons = [];

          //* Concat the arrays
          responses.forEach((response) => {
            const type = response.data.name;

            pokemons = pokemons.concat(
              response.data.pokemon.map((object) => {
                let p = object.pokemon;
                //* format the objects to be able to sort them
                return {
                  name: p.name,
                  url: p.url,
                  type: type,
                  slot: object.slot,
                };
              }),
            );
          });

          const selectedTypes = rootState.sorting.selectedTypes;

          //* (slot_1: first_type; slot_2: second_type)
          const permutation1 = getPokemonsWithExactlyTwoTypes(
            pokemons,
            selectedTypes[0],
            selectedTypes[1],
          );

          console.log("permutation1", permutation1);

          //* (slot_1: second_type; slot_2: first_type)
          const permutation2 = getPokemonsWithExactlyTwoTypes(
            pokemons,
            selectedTypes[1],
            selectedTypes[0],
          );

          console.log("permutation2", permutation2);

          //* Concat these 2 arrays
          results = permutation1.concat(permutation2);
        }

        console.log("results", results);

        //* Create payload to commit
        const payload = {
          count: results.length,
          results,
        };

        commit(RESET_FILTERED_POKEMONS);
        commit(SET_ALL_POKEMONS, payload);
        dispatch(GET_POKEMONS, sortedBy.TYPES);
      });
    },
  },

  getters: {
    /**
     *
     * @param {*} state
     * @returns a filtered array of Pokemons by name or id
     */
    filteredPokemons(state) {
      return state.pokemons.filter((pokemon) => {
        // We have to verify the user input before returning
        // Input needs to be in lower case & trimmed
        return (
          pokemon.name
            .toLowerCase()
            .includes(state.searchedPokemon.toLowerCase()) ||
          pokemon.id.toString().includes(state.searchedPokemon)
        );
      });
    },
  },
};
