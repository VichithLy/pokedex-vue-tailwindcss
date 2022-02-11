<template>
  <img
    class="w-36 h-36 sm:w-48 sm:h-48 mx-auto"
    :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png'"
    :alt="pokemonPictAlt"
  />
</template>

<script>
export default {
  props: {
    pokemonPictAlt: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style></style>
