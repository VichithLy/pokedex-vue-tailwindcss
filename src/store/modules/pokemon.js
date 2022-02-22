import { UPDATE_SEARCHED_POKEMON } from "@/store/mutation-types";
import { UPDATE_SELECTED_POKEMON } from "@/store/mutation-types";
// Mock data
import pokemonsArray from "@/constants/pokemons_array.json";
import { UPDATE_POKEMONS } from "../mutation-types";

export default {
  namespaced: true,

  state() {
    return {
      searchedPokemon: "",
      selectedPokmon: {},
      pokemons: pokemonsArray,
    };
  },

  mutations: {
    [UPDATE_SEARCHED_POKEMON](state, searchedPokemon) {
      state.searchedPokemon = searchedPokemon;
    },
    [UPDATE_SELECTED_POKEMON](state, selectedPokmon) {
      state.selectedPokmon = selectedPokmon;
    },
    [UPDATE_POKEMONS](state, pokemons) {
      state.pokemons = pokemons;
    },
  },

  actions: {
    [UPDATE_SEARCHED_POKEMON]({ commit }, searchedPokemon) {
      commit(UPDATE_SEARCHED_POKEMON, searchedPokemon);
    },
    [UPDATE_SELECTED_POKEMON]({ commit }, selectedPokmon) {
      commit(UPDATE_SELECTED_POKEMON, selectedPokmon);
    },
    [UPDATE_POKEMONS]({ commit }, pokemons) {
      commit(UPDATE_POKEMONS, pokemons);
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
