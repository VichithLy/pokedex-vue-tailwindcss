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
      <button class="btn-primary">Confirm</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  UPDATE_SELECTED_REGION,
  UPDATE_SELECTED_TYPES,
} from "@/store/mutation-types";
import SortByRegion from "./SortByRegion.vue";
import SortByType from "./SortByType.vue";

export default {
  components: { SortByRegion, SortByType },
  computed: {
    ...mapState("accordion", ["isOpen"]),
  },
  methods: {
    ...mapActions("sorting", [UPDATE_SELECTED_TYPES, UPDATE_SELECTED_REGION]),
    resetSorting() {
      this.UPDATE_SELECTED_TYPES([]);
      this.UPDATE_SELECTED_REGION("");
    },
  },
};
</script>

<style></style>
