<template>
  <!-- DELETE THIS DIV (TESTING)  -->
  <div>
    <div
      class="relative flex items-center w-full h-12 rounded-xl focus-within:border-black bg-white border-2 overflow-hidden border-b-4 drop-shadow-lg"
    >
      <div class="grid place-items-center h-full w-12 text-gray-300">
        <!-- Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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

      <input
        v-model.trim="searchedPokemon"
        class="h-full w-full outline-none text-gray-700 pr-2 text-lg"
        type="text"
        placeholder="Search Pokémon..."
      />
    </div>

    <!-- TESTING -->
    <!-- <div>
      Mock Pokemons data :
      <div v-for="pokemon in pokemons" :key="pokemon.id">
        {{ pokemon.id }} - {{ pokemon.name }}
      </div>
    </div>
    <br />
    <div>
      Filtered Pokemons by name or id:
      <div v-for="pokemon in filteredPokemons" :key="pokemon.id">
        {{ pokemon.id }} - {{ pokemon.name }}
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { UPDATE_SEARCHED_POKEMON } from "../../store/mutation-types";

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
    ...mapState("pokemon", ["pokemons"]),
    ...mapGetters("pokemon", ["filteredPokemons"]),
  },
  methods: {
    ...mapActions("pokemon", [UPDATE_SEARCHED_POKEMON]),
  },
};
</script>

<style></style>
