<template>
  <div
    class="sc-type-wrapper shadow border-white"
    :class="'back-color-' + typeColor"
  >
    <img
      class="w-6 h-6 mt-1 sm:w-6 sm:h-6 m-auto sm:mt-2"
      :src="getImg(typeColor)"
      :alt="typeColor"
    />
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
    // This function return the pic who's associate to the type
    getImg(typeColor) {
      return require("@/assets/images/types/" + typeColor + ".png");
    },
  },
};
</script>

<style></style>
