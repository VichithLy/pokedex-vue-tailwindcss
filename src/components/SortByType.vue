<template>
  <div
    class="flex flex-grow flex-col p-4 items-center rounded-xl md:flex-1 bg-gray-200 sm:bg-green-200 md:bg-red-200 md:w-80 md:flex-initial lg:bg-blue-200"
  >
    <h2 class="text-lg font-bold mb-2">Type</h2>

    <!-- Buttons -->
    <div
      class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 mt-2 w-full justify-items-center"
    >
      <BaseCheckboxButton
        v-for="type in types"
        :key="type.id"
        v-model="selectedTypes"
        :input-value="type.name"
      />
    </div>
  </div>
</template>

<script>
import BaseCheckboxButton from "./Base/BaseCheckboxButton.vue";
import types from "../constants/pokemon_types.json";
export default {
  components: { BaseCheckboxButton },
  data() {
    return {
      types: types,
      selectedTypes: [],
    };
  },
};
</script>

<style></style>
