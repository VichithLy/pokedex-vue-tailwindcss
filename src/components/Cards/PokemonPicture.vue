<template>
  <img
    class="sc-picture-wrapper"
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
