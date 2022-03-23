<template>
  <div
    class="flex flex-grow flex-col items-center p-4 rounded-xl md:flex-1 bg-gray-100 border-b-4 border-gray-400 drop-shadow-lg"
  >
    <h2 class="text-lg font-bold mb-2">Type(s)</h2>

    <span v-if="selectedTypes.length > 0" class="text-pokemon-blue-500 italic"
      >You can select up to 2 types</span
    >

    <!-- Grid -->
    <form
      id="types"
      class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-2 w-full justify-items-center"
    >
      <!-- Buttons -->
      <TypeCheckboxButton
        v-for="type in types"
        :key="type.id"
        :input-value="type.name"
      />
    </form>
  </div>
</template>

<script>
import TypeCheckboxButton from "./TypeCheckboxButton.vue";
import types from "@/data/pokemon_types.json";
import { mapState } from "vuex";

export default {
  components: { TypeCheckboxButton },
  data() {
    return {
      // All Pokémon types
      types: types,
    };
  },
  computed: {
    ...mapState("sorting", ["selectedTypes"]),
  },
};
</script>

<style></style>
