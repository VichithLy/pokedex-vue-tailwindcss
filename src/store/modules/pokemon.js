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

const pokemonsArray = require("../../data/pokemons_array.json");

export default {
  namespaced: true,

  state() {
    return {
      searchedPokemon: "",
      selectedPokemon: {},
      pokemons: pokemonsArray,

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
    [UPDATE_SELECTED_POKEMON](state, selectedPokemon) {
      state.selectedPokemon = selectedPokemon;
    },
    [SET_ALL_POKEMONS](state, payload) {
      state.allPokemons.count = payload.count;
      state.allPokemons.results = payload.results;
    },
    [ADD_POKEMON](state, payload) {
      // state.pokemons.push(pokemon);
      state.filteredPokemons.count += payload.count;
      state.filteredPokemons.results.push(payload.pokemon);
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
    [UPDATE_SELECTED_POKEMON]({ commit }, selectedPokemon) {
      commit(UPDATE_SELECTED_POKEMON, selectedPokemon);
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

      console.log("ALL POKEMON", state.allPokemons.results);

      let RESULTS_NUMBER = 20;

      const BEGIN = FILTERED_POKEMONS_COUNT;
      console.log("BEGIN", BEGIN);
      let END;

      if (ALL_POKEMONS_COUNT - FILTERED_POKEMONS_COUNT > RESULTS_NUMBER) {
        END = BEGIN + RESULTS_NUMBER;
        console.log("END", END);

        console.log("We can add 20 Pokemons");
      }

      if (ALL_POKEMONS_COUNT - FILTERED_POKEMONS_COUNT < RESULTS_NUMBER) {
        RESULTS_NUMBER = ALL_POKEMONS_COUNT - FILTERED_POKEMONS_COUNT;
        END = BEGIN + RESULTS_NUMBER;

        console.log("RESULTS_NUMBER", RESULTS_NUMBER);
        console.log("END", END);

        console.log("We cannot add 20 Pokemons");
      }

      if (ALL_POKEMONS_COUNT !== FILTERED_POKEMONS_COUNT) {
        const POKEMON_TO_DISPLAY = state.allPokemons.results.slice(BEGIN, END);
        // console.log("POKEMON_TO_DISPLAY", POKEMON_TO_DISPLAY);

        POKEMON_TO_DISPLAY.forEach((pokemon) => {
          getPokemonByName(pokemon.name).then((result) => {
            const pokemon = result.data;

            const payload = {
              count: 1,
              pokemon: {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types,
                picture:
                  pokemon.sprites.other["official-artwork"].front_default,
              },
            };
            commit(ADD_POKEMON, payload);
          });
        });
      } else {
        console.log("There is no Pokemon to add");
      }
    },
    async [SET_SELECTED_POKEMON]({ commit }, name) {
      console.log("SET_SELECTED_POKEMON");
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
                const evolution_chain = response.data.chain;
                let evolution_chain_array = [];
                getRecursiveEvolution(evolution_chain, evolution_chain_array);
                // Create the Pokemon object used in the DetailedCard component
                const pokemonObject = {
                  id: pokemon.id,
                  name: pokemon.name,
                  about: about,
                  types: pokemon.types,
                  picture:
                    pokemon.sprites.other["official-artwork"].front_default,
                  weight: pokemon.weight / 10,
                  height: pokemon.height / 10,
                  base_stats: pokemon.stats,
                  abilities: pokemon.abilities,
                  evolutions: evolution_chain_array,
                };

                // 1) Show modal for DetailedCard
                // commit(
                //   "modal/" + UPDATE_SHOW_MODAL,
                //   !rootState.modal.showModal,
                //   { root: true },
                // );

                // 2) Commit updateSetSelected state
                // commit(UPDATE_SELECTED_POKEMON, pokemonObject);
                commit(UPDATE_SELECTED_POKEMON, {});

                // 3) hideBodyOverflowY(true);

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
