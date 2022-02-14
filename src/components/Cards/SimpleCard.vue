<template>
  <div
    class="sc-container hover:scale-105 ease-in-out duration-300 bg-yellow-600 cursor-pointer"
  >
    <!-- Number and Type container -->
    <div class="sc-number-type-container">
      <PokemonNumber> #{{ pokemonNum }} </PokemonNumber>

      <PokemonType :pokemon-type-pict-alt="pokemonTypePict.alt" />
    </div>

    <PokemonPicture :pokemon-pict-alt="pokemonPict.alt" />

    <PokemonName>{{ pokemonName }}</PokemonName>
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
    pokemonName: {
      type: String,
      required: true,
      default: "",
    },
    pokemonNum: {
      type: Number,
      required: true,
      default: 0,
    },
    pokemonPict: {
      type: String,
      required: true,
      default: "",
    },
    pokemonTypePict: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style scoped></style>
