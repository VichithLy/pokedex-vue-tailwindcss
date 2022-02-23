<template>
  <div class="dc-about-container bg-gray-50 bg-opacity-60">
    <div>
      <div
        class="dc-about-title-wrapper text-xl font-semibold md:font-bold lg:text-2xl bg-gray-500 bg-opacity-30"
      >
        About
      </div>

      <!-- About text -->
      <p class="dc-about-content-wrapper text-lg text-justify font-semibold">
        {{ about }}
      </p>
    </div>
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
