<template>
  <div class="dc-evolution-container bg-gray-50 bg-opacity-60">
    <div class="dc-evolution-title-wrapper bg-gray-500 bg-opacity-30">
      Evolutions
    </div>

    <!-- Evolutions -->
    <div class="dc-evolution-evolutions-wrapper">
      <div
        v-for="(pokemonEvo, index) in evolutions"
        :key="index"
        class="dc-evolution-boxes-container"
      >
        <div class="dc-evolution-box-wrapper shadow-inner">
          <img :src="pokemonEvo.picture" :alt="pokemonEvo.nom" />
        </div>
        <div class="dc-evolution-box-label">
          {{ pokemonEvo.nom }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    evolutions: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style></style>
