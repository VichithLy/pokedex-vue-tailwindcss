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
import { getPokemonByName } from "../../../services/PokeAPI";
import { SET_SELECTED_POKEMON } from "../../../store/mutation-action-types";

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
      return this.evolutions.types[0].type.name;
    },
  },
  mounted() {
    if (this.evolutions.length !== 0) {
      // API calls
      this.evolutions.pokemons.forEach((name) => {
        getPokemonByName(name).then((response) => {
          const pokemon = {
            name: response.data.name,
            picture:
              response.data.sprites.other["official-artwork"].front_default,
          };
          this.evolutionsPokemons.push(pokemon);
        });
      });
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
