import { UPDATE_SEARCHED_POKEMON } from "@/store/mutation-types";
import { UPDATE_SELECTED_POKEMON } from "@/store/mutation-types";
import { UPDATE_POKEMONS, GET_POKEMONS, ADD_POKEMON } from "../mutation-types";
import { getPokemonByName, getPokemons } from "@/services/PokeAPI";

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
                  types: pokemon.types.map((object) => object.type.name),
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
    // TODO : getPokemonByName and make Pokemon object (for DetailedCard)
    // TODO : commit to selectedPokemon

    // async [GET_POKEMON]({ commit }, name) {
    //   return new Promise((resolve, reject) => {
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
