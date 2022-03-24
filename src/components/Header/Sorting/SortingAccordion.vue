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
      <button type="button" class="btn-secondary" @click="RESET_SORTING()">
        Reset
      </button>
      <button type="submit" class="btn-primary">Confirm</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SortByRegion from "./SortByRegion.vue";
import SortByType from "./SortByType.vue";
import { RESET_SORTING } from "../../../store/mutation-action-types";

export default {
  components: { SortByRegion, SortByType },
  computed: {
    ...mapState("accordion", ["isOpen"]),
  },
  methods: {
    ...mapActions("sorting", [RESET_SORTING]),
  },
};
</script>

<style></style>
