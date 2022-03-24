<template>
  <div class="searchbar">
    <input
      v-model.trim.lazy="searchedPokemon"
      class="search-input"
      type="text"
      placeholder="Search name or id"
    />

    <div class="search-icon-wrapper" @click="searchPokemon()">
      <!-- Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="search-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID,
  UPDATE_IS_LOADING,
  UPDATE_IS_OPEN,
  UPDATE_SEARCHED_POKEMON,
} from "../../store/mutation-action-types";
import debounce from "lodash.debounce";

export default {
  name: "SearchBar",
  computed: {
    searchedPokemon: {
      get() {
        return this.$store.state.pokemon.searchedPokemon;
      },
      set(value) {
        this.UPDATE_SEARCHED_POKEMON(value);
      },
    },
  },
  mounted() {
    this.setPokemons = debounce(function () {
      this.SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID().then(() => {
        this.UPDATE_IS_OPEN(false);
      });
    }, 1000);
  },
  methods: {
    ...mapActions("pokemon", [
      UPDATE_SEARCHED_POKEMON,
      SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID,
      UPDATE_IS_LOADING,
    ]),
    ...mapActions("accordion", [UPDATE_IS_OPEN]),
    searchPokemon(e) {
      this.UPDATE_IS_LOADING(true);
      this.setPokemons();

      e.preventDefault();
    },
  },
};
</script>

<style scoped>
.searchbar {
  @apply relative flex items-center w-full h-12 rounded-xl;
  @apply focus-within:border-black bg-white border-2 overflow-hidden border-b-4 drop-shadow-lg;
}
.search-input {
  @apply h-full w-full outline-none text-gray-700 pr-2 text-lg;
  @apply pl-4;
}

.search-icon-wrapper {
  @apply grid place-items-center h-full w-12 text-gray-300;
  @apply cursor-pointer bg-pokemon-blue-500 hover:bg-pokemon-blue-600;
}

.search-icon {
  @apply h-6 w-6 text-white ease-in-out duration-100;
}
</style>
