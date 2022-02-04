<template>
  <div
    class="flex flex-col flex-initial p-4 justify-center items-center border-2 rounded-xl"
  >
    <h2 class="text-lg font-bold mb-4">Region</h2>

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
