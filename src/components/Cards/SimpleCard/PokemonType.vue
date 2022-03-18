<template>
  <div class="sc-type-wrapper has-tooltip" :class="'back-color-' + type">
    <img class="sc-type-picture" :src="getImg(type)" :alt="type" />
    <span class="capitalize tooltip">{{ type }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      default: "",
    },
  },
  methods: {
    // This function returns the pic who's associated to the type
    getImg(type) {
      return require("@/assets/images/types/" + type + ".png");
    },
  },
};
</script>

<style></style>
