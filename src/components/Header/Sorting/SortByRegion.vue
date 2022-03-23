<template>
  <div
    class="flex flex-col flex-grow md:flex-initial p-4 items-center rounded-xl bg-gray-100 border-b-4 border-gray-400 drop-shadow-lg"
  >
    <h2 class="text-lg font-bold mb-2">Region</h2>
    <!-- Grid -->
    <form id="regions" class="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 w-full">
      <!-- Switches -->
      <RegionToggleSwitch
        v-for="region in regions"
        :key="region.id"
        :input-value="region.name"
      />
    </form>
  </div>
</template>

<script>
import RegionToggleSwitch from "./RegionToggleSwitch.vue";
import regions from "../../../data/pokemon_regions.json";

export default {
  name: "SortByRegion",
  components: { RegionToggleSwitch },
  data() {
    return {
      // All Pokémon regions
      regions: regions,
    };
  },
};
</script>

<style></style>
