<template>
  <!-- Card -->

  <div
    class="simple-card rounded-2xl hover:scale-105 ease-in-out duration-300 bg-yellow-600 cursor-pointer relative h-64 w-40 mx-2 my-2 sm:mx-4 sm:my-4 sm:h-80 sm:w-60"
  >
    <!-- Number and Type container -->
    <div class="flex items-center flex-row justify-between py-2">
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
