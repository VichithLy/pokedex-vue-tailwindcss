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
          v-for="(type, index) in getTypes"
          :key="index"
          :type="type"
        />
      </div>
    </div>

    <PokemonPicture :pokemon-pict="picture || ''" />

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
  UPDATE_SHOW_MODAL,
  UPDATE_IS_OVER_CARD,
  SET_SELECTED_POKEMON,
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
    getTypes() {
      return this.types.map((object) => object.type.name);
    },
    // This function returns the bg class to apply on the cards if there are one or two types
    gradientBackground() {
      if (this.getTypes.length == 2) {
        return `bg-gradient-to-b back-from-${this.getTypes[0]} back-to-${this.getTypes[1]}`;
      }
      return `back-color-${this.getTypes[0]}-dark`;
    },
  },
  mounted() {
    // console.log(this.setDetailedPokemon("butterfree"));
  },
  methods: {
    ...mapActions("cursor", [UPDATE_IS_OVER_CARD]),
    ...mapActions("pokemon", [SET_SELECTED_POKEMON]),
    ...mapActions("modal", [UPDATE_SHOW_MODAL]),

    handleOnCardClick() {
      // 1) Set selected pokemon state
      // 2) Set Show modal state to true
      // 3) Hide body overflow y
      this.SET_SELECTED_POKEMON(this.name).then(() => {
        this.UPDATE_SHOW_MODAL(true).then(() => {
          hideBodyOverflowY(true);
        });
      });
    },
  },
};
</script>

<style scoped></style>
