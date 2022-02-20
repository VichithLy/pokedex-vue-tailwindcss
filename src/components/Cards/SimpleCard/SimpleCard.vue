<template>
  <div
    class="sc-container hover:scale-105 ease-in-out duration-300 cursor-pointer border-b-4 border-gray-400 drop-shadow-lg"
    :class="gradientBackground"
    @mouseover="updateIsOverCard(true)"
    @mouseleave="updateIsOverCard(false)"
  >
    <!-- Number and Type container -->
    <div class="sc-number-type-container">
      <PokemonNumber> #{{ id }} </PokemonNumber>

      <div class="flex items-center flex-row justify-between gap-x-2 mr-4">
        <PokemonType
          v-for="(type, index) in types"
          :key="index"
          :type-color="type"
        />
      </div>
    </div>

    <PokemonPicture :pokemon-pict="picture" />

    <PokemonName>{{ name }}</PokemonName>
  </div>
</template>

<script>
import PokemonName from "./PokemonName.vue";
import PokemonNumber from "./PokemonNumber.vue";
import PokemonPicture from "./PokemonPicture.vue";
import PokemonType from "./PokemonType.vue";

export default {
  components: { PokemonType, PokemonNumber, PokemonPicture, PokemonName },
  props: {
    pokemonObject: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      id: this.pokemonObject.id,
      name: this.pokemonObject.name,
      about: this.pokemonObject.about,
      picture: this.pokemonObject.picture,
      types: this.pokemonObject.types,
    };
  },
  computed: {
    // This function return the bg class to apply on the cards if there are one or two types
    gradientBackground: function () {
      if (this.types.length == 2) {
        return `bg-gradient-to-b back-from-${this.types[0]} back-to-${this.types[1]}`;
      }
      return `back-color-${this.types[0]}-dark`;
    },
  },
  methods: {
    updateIsOverCard(value) {
      this.$store.commit("cursor/UPDATE_IS_OVER_CARD", value);
    },
  },
};
</script>

<style scoped></style>
