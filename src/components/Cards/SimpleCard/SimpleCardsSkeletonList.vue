<template>
  <!-- List of SimpleCard components -->
  <div class="sc-list-container">
    <SimpleCardSkeleton v-for="n in 4" :key="n" />
  </div>
</template>

<script>
import SimpleCardSkeleton from "./SimpleCardSkeleton.vue";
export default {
  components: { SimpleCardSkeleton },
};
</script>

<style></style>
