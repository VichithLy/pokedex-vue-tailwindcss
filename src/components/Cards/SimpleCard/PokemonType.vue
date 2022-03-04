<template>
  <div class="sc-type-wrapper" :class="'back-color-' + typeColor">
    <img class="sc-type-picture" :src="getImg(typeColor)" :alt="typeColor" />
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
