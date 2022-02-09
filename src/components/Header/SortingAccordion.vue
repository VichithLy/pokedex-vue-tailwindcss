<template>
  <div
    class="relative overflow-hidden transition-all duration-500 ease-in-out max-h-0 sm:max-h-1000"
    :class="[isOpen ? 'max-h-1000' : '']"
  >
    <!-- Sort by types and regions -->
    <div class="flex flex-wrap gap-y-5 gap-x-5 mt-6 items-start">
      <SortByRegion />
      <SortByType />
    </div>

    <!-- Reset & Confirm -->
    <div class="flex justify-between pt-6">
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
};
</script>

<style></style>
