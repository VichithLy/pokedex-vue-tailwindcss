<template>
  <div
    class="flex justify-between items-center border-red-500 border-2"
    @click="toggleActive = !toggleActive"
  >
    <h2>{{ region }}</h2>

    <!-- Toggle Switch -->
    <div
      class="
        w-16
        h-10
        flex
        items-center
        bg-gray-300
        rounded-full
        p-1
        duration-300
        ease-in-out
      "
      :class="{ 'bg-blue-500': toggleActive }"
    >
      <div
        class="
          bg-white
          w-8
          h-8
          rounded-full
          shadow-md
          transform
          duration-300
          ease-in-out
        "
        :class="{ 'translate-x-6': toggleActive }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleActive: false,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
      default: "undefined",
    },
  },
};
</script>

<style>
</style>