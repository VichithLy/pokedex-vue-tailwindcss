<template>
  <div class="dc-evolution-container bg-gray-50 bg-opacity-60">
    <div class="dc-evolution-title-wrapper bg-gray-500 bg-opacity-30">
      Evolutions
    </div>

    <!-- Evolutions -->
    <div class="dc-evolution-evolutions-wrapper">
      <div
        v-for="(pokemon, index) in evolutionsPokemons"
        :key="index"
        class="dc-evolution-boxes-container"
        :class="evolutions.currentPokemon == pokemon.name && ['cursor-default']"
        @click="handleOnDcClick(pokemon.name)"
      >
        <div
          class="dc-evolution-box-wrapper shadow-inner"
          :class="
            evolutions.currentPokemon == pokemon.name && [
              'bg-gradient-to-b',
              `back-from-${getType}`,
              `back-to-${getType}`,
            ]
          "
        >
          <img :src="pokemon.picture" :alt="pokemon.name" />
        </div>
        <div class="dc-evolution-box-label">
          {{ pokemon.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  getDataFromUrl,
  API_URL,
  makeConcurrentRequests,
} from "../../../services/PokeAPI";
import { SET_SELECTED_POKEMON } from "../../../store/mutation-action-types";
import {
  getIdFromUrl,
  pokemonByIdAndNameAndPicture,
  sortPokemonsByIdAsc,
} from "../../../utils";

export default {
  props: {
    evolutions: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      evolutionsPokemons: [],
    };
  },
  computed: {
    getType() {
      if (this.evolutions.types[0].type.name)
        return this.evolutions.types[0].type.name;
      return "normal";
    },
  },
  mounted() {
    if (this.evolutions.length !== 0) {
      makeConcurrentRequests(
        this.evolutions.pokemons.map((pokemon) =>
          // We need the URL with the Pokémon's ID
          getDataFromUrl(`${API_URL}/pokemon/${getIdFromUrl(pokemon.url)}`),
        ),
      ).then((responses) => {
        responses.forEach((response) =>
          this.evolutionsPokemons.push(
            pokemonByIdAndNameAndPicture(response.data),
          ),
        );
        // In case the array is unordered
        sortPokemonsByIdAsc(this.evolutionsPokemons);
      });

      console.log(this.evolutionsPokemons);
    }
  },
  methods: {
    ...mapActions("pokemon", [SET_SELECTED_POKEMON]),
    handleOnDcClick(name) {
      if (this.evolutions.currentPokemon !== name)
        this.SET_SELECTED_POKEMON(name);
    },
  },
};
</script>

<style></style>
