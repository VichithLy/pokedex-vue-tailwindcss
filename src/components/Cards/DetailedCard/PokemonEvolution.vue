<template>
  <div class="p-3 md:col-span-2 rounded-2xl bg-gray-50 bg-opacity-60">
    <div>
      <div
        class="h-82 flex justify-center bg-gray-500 bg-opacity-30 rounded-3xl text-xl font-semibold md:font-bold lg:text-2xl"
      >
        Evolutions
      </div>

      <!-- Evolutions -->
      <div class="flex justify-center md:flex-row">
        <div
          v-for="(pokemonEvo, index) in evolutions"
          :key="index"
          class="mt-4 md:mt-8 mx-5 lg:mx-10"
        >
          <div
            class="shadow-2xl w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-green-400 rounded-full"
          >
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
