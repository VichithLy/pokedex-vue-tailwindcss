<template>
  <div class="p-5 md:col-span-1 rounded-2xl bg-gray-50 bg-opacity-60">
    <div>
      <div
        class="h-82 flex justify-center rounded-3xl text-xl font-semibold md:font-bold lg:text-2xl bg-gray-500 bg-opacity-30"
      >
        About
      </div>

      <!-- About text -->
      <p class="mt-1 text-lg text-justify lg:sm:mt-4 p-2 font-semibold">
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
