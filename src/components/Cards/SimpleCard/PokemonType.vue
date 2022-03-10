<template>
  <div class="sc-type-wrapper has-tooltip" :class="'back-color-' + typeColor">
    <img class="sc-type-picture" :src="getImg(typeColor)" :alt="typeColor" />
    <span
      class="capitalize tooltip rounded-lg shadow-2xl py-1 px-2 bg-gray-100 -mt-20 border border-black"
      >{{ typeColor }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    typeColor: {
      type: String,
      required: true,
      default: "",
    },
  },
  methods: {
    // This function returns the pic who's associated to the type
    getImg(typeColor) {
      return require("@/assets/images/types/" + typeColor + ".png");
    },
  },
};
</script>

<style></style>
