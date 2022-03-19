import { UPDATE_SEARCHED_POKEMON } from "@/store/mutation-types";
import { UPDATE_SELECTED_POKEMON } from "@/store/mutation-types";
import {
  SET_ALL_POKEMONS,
  GET_POKEMONS,
  ADD_POKEMONS,
  SET_SELECTED_POKEMON,
  UPDATE_FILTERED_POKEMONS,
  SET_POKEMONS_BY_REGION,
} from "../mutation-types";
import {
  getAllPokemons,
  getPokemonByName,
  getPokemonByNames,
  getInfoByUrl,
  getRegionByName,
} from "../../services/PokeAPI";
import { getRecursiveEvolution } from "../../utils";
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
      filteredPokemons: { status: -1, isSortedBy: -1, count: 0, results: [] },
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
      state.status = payload.status;
      state.isSortedBy = payload.isSortedBy;
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

    async [GET_POKEMONS]({ commit, state }) {
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

      getPokemonByNames(
        POKEMONS_TO_DISPLAY.map((pokemon) => getInfoByUrl(pokemon.url)),
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
              isSortedBy: sortedBy.REGION,
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
              isSortedBy: sortedBy.REGION,
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
            getInfoByUrl(species_url).then((response) => {
              const species = response.data;

              // About
              const about = species.flavor_text_entries[0].flavor_text;

              // Evolution
              const evolution_chain_url = species.evolution_chain.url;

              // Get the evolution chain
              getInfoByUrl(evolution_chain_url).then((response) => {
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
    async [SET_POKEMONS_BY_REGION]({ commit, dispatch }, name) {
      getRegionByName(name).then((response) => {
        const region = response.data;
        const region_url = region.main_generation.url;
        console.log("region_url", region_url);

        getInfoByUrl(region_url).then((response) => {
          const pokemons_species = response.data.pokemon_species;

          console.log("pokemons_species", pokemons_species);

          /**
           * ! We use getInfoByUrl() instead of getPokemonByName()
           * ! because some Pokemons need to be searched by their id
           * ! e.g.: deoxys
           */
          getPokemonByNames(
            pokemons_species.map((pokemon) => getInfoByUrl(pokemon.url)),
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
              // Reset filteredPokemon
              const payload = {
                count: 0,
                results: [],
              };
              commit(UPDATE_FILTERED_POKEMONS, payload);
              // Display Pokemons
              dispatch(GET_POKEMONS);
            });
        });
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
