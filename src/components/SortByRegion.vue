<template>
  <div
    class="
      flex flex-col flex-grow
      p-4
      items-center
      rounded-xl
      bg-green-200
      md:bg-red-200 md:w-80 md:flex-initial
      lg:bg-blue-200
    "
  >
    <h2 class="text-lg font-bold mb-2">Region</h2>

    <div class="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 w-full">
      <BaseToggleSwitch
        v-model="selectedRegions"
        input-value="kanto"
        label="Kanto"
      />

      <BaseToggleSwitch
        v-model="selectedRegions"
        input-value="hoenn"
        label="Hoenn"
      />
      <BaseToggleSwitch
        v-model="selectedRegions"
        input-value="unova"
        label="Unova"
      />

      <BaseToggleSwitch
        v-model="selectedRegions"
        input-value="johto"
        label="Johto"
      />

      <BaseToggleSwitch
        v-model="selectedRegions"
        input-value="sinnoh"
        label="Sinnoh"
      />

      <BaseToggleSwitch
        v-model="selectedRegions"
        input-value="alola"
        label="Alola"
      />

      <BaseToggleSwitch
        v-model="selectedRegions"
        input-value="kalos"
        label="Kalos"
      />

      <BaseToggleSwitch
        v-model="selectedRegions"
        input-value="galar"
        label="Galar"
      />
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
      selectedRegions: [],
    };
  },
};
</script>

<style></style>
