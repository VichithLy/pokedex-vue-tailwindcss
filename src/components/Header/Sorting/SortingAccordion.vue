<template>
  <div
    id="sorting-section"
    class="relative overflow-hidden transition-all duration-100 ease-in-out max-h-0 md:max-h-1000"
    :class="isOpen && 'max-h-1000'"
  >
    <!-- Sorting section -->
    <div class="flex flex-wrap gap-y-5 gap-x-5 mt-6 items-start">
      <SortByRegion />
      <SortByType />
    </div>

    <!-- Reset & Confirm -->
    <div class="flex justify-between pt-6">
      <button class="btn-secondary" @click="resetSorting()">Reset</button>
      <button class="btn-primary" @click="onConfirmClick()">Confirm</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  UPDATE_SELECTED_REGION,
  UPDATE_SELECTED_TYPES,
} from "@/store/mutation-action-types";
import SortByRegion from "./SortByRegion.vue";
import SortByType from "./SortByType.vue";
import {
  SET_POKEMONS_BY_REGION,
  SET_POKEMONS_BY_TYPES,
} from "../../../store/mutation-action-types";

export default {
  components: { SortByRegion, SortByType },
  computed: {
    ...mapState("accordion", ["isOpen"]),
    ...mapState("sorting", ["selectedRegion", "selectedTypes"]),
  },
  methods: {
    ...mapActions("sorting", [UPDATE_SELECTED_TYPES, UPDATE_SELECTED_REGION]),
    ...mapActions("pokemon", [SET_POKEMONS_BY_REGION, SET_POKEMONS_BY_TYPES]),
    resetSorting() {
      this.UPDATE_SELECTED_TYPES([]);
      this.UPDATE_SELECTED_REGION("");
    },
    onConfirmClick() {
      // If region selected and no types
      if (this.selectedRegion && this.selectedTypes.length === 0) {
        console.log("CASE 1 : region");
        console.log("selectedRegion", this.selectedRegion);
        // this.SET_POKEMONS_BY_REGION();
      }
      // If types selected and no region
      else if (!this.selectedRegion && this.selectedTypes.length > 0) {
        console.log("CASE 2 : types");
        console.log("selectedRegion", this.selectedRegion);
        console.log("selectedTypes", this.selectedTypes);
        // this.SET_POKEMONS_BY_TYPES();
      }
      // If both selected
      else if (this.selectedRegion && this.selectedTypes.length > 0) {
        console.log("CASE 3 : region && types");
        console.log("selectedRegion", this.selectedRegion);
        console.log("selectedTypes", this.selectedTypes);

        // setPokemonsByRegionAndTypes(region:string, types:array)
      }
      // If none selected
      else {
        console.log("CASE 4 : none");
        // getPokemons()
      }
    },
  },
};
</script>

<style></style>
