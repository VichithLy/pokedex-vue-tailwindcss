import { UPDATE_SEARCHED_POKEMON } from "@/store/mutation-types";
import { UPDATE_SELECTED_POKEMON } from "@/store/mutation-types";
import {
  UPDATE_POKEMONS,
  GET_POKEMONS,
  ADD_POKEMON,
  SET_SELECTED_POKEMON,
} from "../mutation-types";
import {
  getPokemonByName,
  getPokemons,
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
    };
  },

  mutations: {
    [UPDATE_SEARCHED_POKEMON](state, searchedPokemon) {
      state.searchedPokemon = searchedPokemon;
    },
    [UPDATE_SELECTED_POKEMON](state, selectedPokemon) {
      state.selectedPokemon = selectedPokemon;
    },
    [UPDATE_POKEMONS](state, pokemons) {
      state.pokemons = pokemons;
    },
    [ADD_POKEMON](state, pokemon) {
      state.pokemons.push(pokemon);
    },
  },

  actions: {
    [UPDATE_SEARCHED_POKEMON]({ commit }, searchedPokemon) {
      commit(UPDATE_SEARCHED_POKEMON, searchedPokemon);
    },
    [UPDATE_SELECTED_POKEMON]({ commit }, selectedPokemon) {
      commit(UPDATE_SELECTED_POKEMON, selectedPokemon);
    },

    async [GET_POKEMONS]({ commit }) {
      return new Promise((resolve, reject) => {
        getPokemons()
          .then((response) => {
            const pokemons = response.data.results;

            pokemons.forEach((pokemon) => {
              getPokemonByName(pokemon.name).then((result) => {
                const pokemon = result.data;

                const pokemonObject = {
                  id: pokemon.id,
                  name: pokemon.name,
                  types: pokemon.types,
                  picture:
                    pokemon.sprites.other["official-artwork"].front_default,
                };

                commit(ADD_POKEMON, pokemonObject);
                resolve(pokemonObject);
              });
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
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
