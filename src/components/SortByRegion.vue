<template>
  <div
    class="
      flex flex-col flex-grow
      md:flex-initial
      p-4
      items-center
      rounded-xl
      bg-gray-100
      border-b-4 border-gray-400
      drop-shadow-lg
    "
  >
    <h2 class="text-lg font-bold mb-2">Region(s)</h2>
    <!-- Grid -->
    <div class="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 w-full">
      <!-- Switches -->
      <BaseToggleSwitch
        v-for="region in regions"
        :key="region.id"
        v-model="selectedRegions"
        :input-value="region.name"
      />
    </div>
  </div>
</template>

<script>
import BaseToggleSwitch from "./Base/BaseToggleSwitch.vue";
import regions from "../constants/pokemon_regions.json";

export default {
  name: "SortByRegion",
  components: { BaseToggleSwitch },
  data() {
    return {
      // Checked regions
      selectedRegions: [],
      // All Pokémon regions
      regions: regions,
    };
  },
};
</script>

<style></style>
