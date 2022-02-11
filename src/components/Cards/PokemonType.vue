<template>
  <div
    class="shadow-2xl w-8 h-8 sm:w-10 sm:h-10 bg-green-400 rounded-full mr-4"
  >
    <img
      class="w-6 h-6 mt-1 sm:w-6 sm:h-6 m-auto sm:mt-2"
      :src="'https://images.gameinfo.io/pokemon-trimmed/60/p1.webp'"
      :alt="pokemonTypePictAlt"
    />
  </div>
</template>

<script>
export default {
  props: {
    pokemonTypePictAlt: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style></style>
