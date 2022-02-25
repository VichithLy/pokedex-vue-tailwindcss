<template>
  <div class="dc-about-container bg-gray-50 bg-opacity-60">
    <div class="dc-about-title-wrapper bg-gray-500 bg-opacity-30">About</div>

    <!-- About text -->
    <p class="dc-about-content-wrapper">
      {{ about }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    about: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style></style>
