<template>
  <!-- List of SimpleCard components -->
  <div class="sc-list-container">
    <SimpleCardSkeleton v-for="n in resultsNumber" :key="n" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import SimpleCardSkeleton from "./SimpleCardSkeleton.vue";
export default {
  components: { SimpleCardSkeleton },
  computed: {
    ...mapState("pokemon", ["resultsNumber"]),
  },
};
</script>

<style></style>
