<template>
  <img class="sc-picture-wrapper" :src="pokemonPict" />
</template>

<script>
export default {
  props: {
    pokemonPict: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style></style>
