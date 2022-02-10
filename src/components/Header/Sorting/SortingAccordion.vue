<template>
  <div
    id="sorting-section"
    class="relative overflow-hidden transition-all duration-300 ease-in-out max-h-0 sm:max-h-1000"
    :class="[isOpen ? 'max-h-1000' : '']"
  >
    <!-- Sorting section -->
    <div class="flex flex-wrap gap-y-5 gap-x-5 mt-6 items-start">
      <SortByRegion />
      <SortByType />
    </div>

    <!-- Reset & Confirm -->
    <div class="flex justify-between pt-6" @click="resetSorting()">
      <button class="btn-secondary">Reset</button>
      <button class="btn-primary">Confirm</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SortByRegion from "./SortByRegion.vue";
import SortByType from "./SortByType.vue";

export default {
  components: { SortByRegion, SortByType },
  computed: {
    ...mapState(["isOpen"]),
  },
  methods: {
    resetSorting() {
      this.$store.commit("updateSelectedRegions", []);
      this.$store.commit("updateSelectedTypes", []);
    },
  },
};
</script>

<style></style>
