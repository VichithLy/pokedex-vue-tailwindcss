<template>
  <div class="relative">
    <div class="searchbar">
      <input
        v-model.trim="searchedPokemon"
        class="search-input"
        type="text"
        placeholder="Search name or id"
        @input="onInputChange()"
        @keypress.enter="() => (showAutoComplete = false)"
        @click="onInputChange()"
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

    <div v-show="showAutoComplete" ref="box" class="autocomplete-box">
      <div class="box-content">
        <div class="results-message">
          {{ suggestions.length }} suggestions for
          <span class="font-bold">"{{ searchedPokemon }}"</span>
        </div>
        <li
          v-for="(pokemon, index) in suggestions"
          :key="index"
          class="capitalize"
          @click="onSuggestionClick(pokemon.name)"
        >
          #{{ getIdFromUrl(pokemon.url) }} - {{ pokemon.name }}
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID,
  UPDATE_IS_LOADING,
  UPDATE_IS_OPEN,
  UPDATE_SEARCHED_POKEMON,
} from "../../store/mutation-action-types";
import debounce from "lodash.debounce";
import { ref } from "vue";
import useClickOutside from "../../composables/useClickOutside";
import { filterPokemonsByNameOrId, getIdFromUrl } from "../../utils";
import staticAllPokemons from "../../data/all_pokemons.json";

export default {
  name: "SearchBar",

  setup() {
    // Refs
    const showAutoComplete = ref(false);
    const box = ref(null);

    // Composable
    const { onClickOutside } = useClickOutside();
    onClickOutside(box, () => (showAutoComplete.value = false));

    // Methods
    return { showAutoComplete, box };
  },

  data() {
    return {
      staticAllPokemons,
    };
  },

  computed: {
    ...mapState("pokemon", ["filteredPokemons"]),
    searchedPokemon: {
      get() {
        return this.$store.state.pokemon.searchedPokemon;
      },
      set(value) {
        this.UPDATE_SEARCHED_POKEMON(value);
      },
    },
    suggestions() {
      return filterPokemonsByNameOrId(staticAllPokemons, this.searchedPokemon);
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
    searchPokemon() {
      this.UPDATE_IS_LOADING(true);
      this.setPokemons();
    },
    onInputChange() {
      this.searchedPokemon == ""
        ? (this.showAutoComplete = false)
        : (this.showAutoComplete = true);
    },
    onSuggestionClick(name) {
      this.UPDATE_SEARCHED_POKEMON(name);
      this.showAutoComplete = false;
    },
    getIdFromUrl,
  },
};
</script>

<style scoped>
.searchbar {
  @apply relative flex items-center w-full h-12 rounded-xl;
  @apply focus-within:border-black bg-white overflow-hidden;
  @apply border-b-4 drop-shadow-lg border-gray-400;
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

.autocomplete-box {
  @apply border-2 border-black rounded-xl shadow-2xl mt-2 bg-white;
  @apply p-2 select-none absolute z-10 w-full;
}

.box-content {
  @apply overflow-x-auto max-h-60 pr-1;
}

.autocomplete-box li {
  @apply list-none w-full px-2 py-2;
  @apply rounded-lg;
  @apply hover:bg-gray-200;
}

.results-message {
  @apply p-2 mb-2 border-b-2 text-gray-500;
}
</style>
