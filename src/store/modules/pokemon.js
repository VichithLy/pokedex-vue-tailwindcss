import { UPDATE_SEARCHED_POKEMON } from "@/store/mutation-types";
import { UPDATE_SELECTED_POKEMON } from "@/store/mutation-types";
import {
  SET_ALL_POKEMONS,
  GET_POKEMONS,
  ADD_POKEMON,
  SET_SELECTED_POKEMON,
  UPDATE_FILTERED_POKEMONS,
} from "../mutation-types";
import {
  getAllPokemons,
  getPokemonByName,
  getInfoByUrl,
} from "@/services/PokeAPI";
import { getRecursiveEvolution } from "../../utils";
import { getPokemonByNames } from "../../services/PokeAPI";

export default {
  namespaced: true,

  state() {
    return {
      searchedPokemon: "",
      selectedPokemon: {},

      // All existing Pokemons in the API
      allPokemons: { count: 0, results: [] },
      // Pokemons that will be displayed on the screen
      filteredPokemons: { count: 0, results: [] },
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
    [ADD_POKEMON](state, payload) {
      state.filteredPokemons.count += payload.count;
      // state.filteredPokemons.results.push(payload.pokemon);
      state.filteredPokemons.results = [
        ...state.filteredPokemons.results,
        ...payload.pokemons,
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
      const FILTERED_POKEMONS_COUNT = state.filteredPokemons.count;
      const ALL_POKEMONS_COUNT = state.allPokemons.count - 1;

      // console.log("ALL POKEMON", state.allPokemons.results);

      let RESULTS_NUMBER = 10;

      const BEGIN = FILTERED_POKEMONS_COUNT;
      console.log("BEGIN", BEGIN);
      let END;

      if (ALL_POKEMONS_COUNT - FILTERED_POKEMONS_COUNT > RESULTS_NUMBER) {
        END = BEGIN + RESULTS_NUMBER;
        //console.log("END", END);

        //console.log("We can add 10 Pokemons");
      }

      if (ALL_POKEMONS_COUNT - FILTERED_POKEMONS_COUNT < RESULTS_NUMBER) {
        RESULTS_NUMBER = ALL_POKEMONS_COUNT - FILTERED_POKEMONS_COUNT;
        END = BEGIN + RESULTS_NUMBER;

        console.log("RESULTS_NUMBER", RESULTS_NUMBER);
        //console.log("END", END);

        //console.log("We cannot add 10 Pokemons");
      }

      if (FILTERED_POKEMONS_COUNT !== ALL_POKEMONS_COUNT) {
        const POKEMON_TO_DISPLAY = state.allPokemons.results.slice(BEGIN, END);

        getPokemonByNames(
          POKEMON_TO_DISPLAY.map((pokemon) => getPokemonByName(pokemon.name)),
        ).then((response) => {
          const pokemons = response.map((pokemon) => {
            return {
              id: pokemon.data.id,
              name: pokemon.data.name,
              types: pokemon.data.types,
              picture:
                pokemon.data.sprites.other["official-artwork"].front_default,
            };
          });

          console.log("pokemons", pokemons);

          const payload = {
            count: RESULTS_NUMBER,
            pokemons,
          };

          // console.log("payload", payload);
          commit(ADD_POKEMON, payload);
        });
      } else {
        console.log("There is no Pokemon to add");
      }
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
    // async [SET_POKEMONS_BY_REGIONS]({ commit }, ids) {
    //   ids.forEach((id) => {
    //     getGenerationById(id).then((response) => {
    //       const pokemons_species = response.pokemon_species;

    //       const pokemons_by_regions = [];

    //       pokemons_species.forEach((specie) => {
    //         getPokemonByName(specie.name).then((pokemon) =>
    //           pokemons_by_regions.push(pokemon),
    //         );
    //       });

    //       commit(UPDATE_POKEMONS, pokemons_by_regions);
    //     });
    //   });
    // },
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
