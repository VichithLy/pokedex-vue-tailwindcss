<template>
  <div class="dc-evolution-container bg-gray-50 bg-opacity-60">
    <div class="dc-evolution-title-wrapper bg-gray-500 bg-opacity-30">
      Evolutions
    </div>

    <!-- Evolutions -->
    <div class="dc-evolution-evolutions-wrapper">
      <div
        v-for="(pokemon, index) in evolution_pokemons"
        :key="index"
        class="dc-evolution-boxes-container"
        @click="SET_SELECTED_POKEMON(pokemon.name)"
      >
        <div class="dc-evolution-box-wrapper shadow-inner">
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
import { getPokemonByName } from "../../../services/PokeAPI";
import { SET_SELECTED_POKEMON } from "../../../store/mutation-types";

export default {
  props: {
    evolutions: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      evolution_pokemons: [],
    };
  },
  mounted() {
    if (this.evolutions.length !== 0) {
      this.evolutions.forEach((name) => {
        getPokemonByName(name).then((response) => {
          const pokemon = {
            name: response.data.name,
            picture:
              response.data.sprites.other["official-artwork"].front_default,
          };
          this.evolution_pokemons.push(pokemon);
        });
      });
    }
  },
  methods: {
    ...mapActions("pokemon", [SET_SELECTED_POKEMON]),
  },
};
</script>

<style></style>
