<template>
  <div class="dc-evolution-container bg-gray-50 bg-opacity-60">
    <div>
      <div
        class="dc-evolution-title-wrapper bg-gray-500 bg-opacity-30 text-xl font-semibold md:font-bold lg:text-2xl"
      >
        Evolutions
      </div>

      <!-- Evolutions -->
      <div class="dc-evolution-evolutions-wrapper">
        <div
          v-for="(pokemonEvo, index) in evolutions"
          :key="index"
          class="dc-evolution-boxes-container"
        >
          <div class="dc-evolution-box-wrapper shadow-2xl bg-green-400">
            <img
              class="sm:w-28 m-auto"
              :src="pokemonEvo.picture"
              :alt="pokemonEvo.nom"
            />
          </div>
          <div
            class="text-center mt-1 lg:mt-4 font-semibold capitalize text-lg lg:text-xl"
          >
            {{ pokemonEvo.nom }}
          </div>
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
