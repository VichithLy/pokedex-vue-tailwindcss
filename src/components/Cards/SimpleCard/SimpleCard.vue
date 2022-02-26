<template>
  <div
    class="sc-container hover:scale-105 ease-in-out duration-100 cursor-pointer border-b-4 border-gray-400 drop-shadow-lg select-none"
    :class="gradientBackground"
    @mouseover="UPDATE_IS_OVER_CARD(true)"
    @mouseleave="UPDATE_IS_OVER_CARD(false)"
    @click="handleOnCardClick"
  >
    <!-- Number and Type container -->
    <div class="sc-number-type-container">
      <PokemonNumber> #{{ id }} </PokemonNumber>

      <div class="sc-types-container">
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
import { mapActions, mapState } from "vuex";
import PokemonName from "./PokemonName.vue";
import PokemonNumber from "./PokemonNumber.vue";
import PokemonPicture from "./PokemonPicture.vue";
import PokemonType from "./PokemonType.vue";
import {
  UPDATE_SELECTED_POKEMON,
  UPDATE_SHOW_MODAL,
  UPDATE_IS_OVER_CARD,
} from "../../../store/mutation-types";

import { hideBodyOverflowY } from "../../../utils";

export default {
  components: {
    PokemonType,
    PokemonNumber,
    PokemonPicture,
    PokemonName,
  },
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
    ...mapState("modal", ["showModal"]),
    // This function return the bg class to apply on the cards if there are one or two types
    gradientBackground: function () {
      if (this.types.length == 2) {
        return `bg-gradient-to-b back-from-${this.types[0]} back-to-${this.types[1]}`;
      }
      return `back-color-${this.types[0]}-dark`;
    },
  },
  methods: {
    ...mapActions("cursor", [UPDATE_IS_OVER_CARD]),
    ...mapActions("pokemon", [UPDATE_SELECTED_POKEMON]),
    ...mapActions("modal", [UPDATE_SHOW_MODAL]),
    handleOnCardClick() {
      this.UPDATE_SELECTED_POKEMON(this.pokemonObject).then(() => {
        this.UPDATE_SHOW_MODAL(!this.showModal);
        hideBodyOverflowY(true);
      });
    },
  },
};
</script>

<style scoped></style>
