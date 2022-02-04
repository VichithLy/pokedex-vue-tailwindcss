<template>
  <div
    class="
      flex flex-col
      order-1
      flex-auto
      justify-center
      items-center
      border-green-400 border-4
    "
  >
    <h2 class="text-lg font-bold">Region</h2>

    <div
      class="
        grid grid-cols-2
        gap-x-8 gap-y-2
        border-blue-500 border-2
        mt-2
        w-full
      "
    >
      <BaseToggleSwitch region="Kanto" />
      <BaseToggleSwitch />
      <BaseToggleSwitch />
      <BaseToggleSwitch />
      <BaseToggleSwitch />
      <BaseToggleSwitch />
      <BaseToggleSwitch />
      <BaseToggleSwitch />
    </div>
  </div>
</template>

<script>
import BaseToggleSwitch from "./Base/BaseToggleSwitch.vue";
export default {
  name: "SortByRegion",
  components: { BaseToggleSwitch },
  data() {
    return {
      regions: [],
    };
  },
};
</script>

<style></style>
