<template>
  <div class="flex flex-auto whitespace-nowrap items-center flex-wrap">
    <span>
      {{ pokemonsNumber }}
      <span> results for: </span>
    </span>

    <span
      v-if="
        !sorting.key_value &&
        sorting.region === enum_region.NONE &&
        sorting.types.length === 0
      "
      class="whitespace-pre font-bold"
    >
      all
    </span>

    <ul v-else class="list-disc list-inside flex ml-4 gap-4 flex-wrap">
      <li v-if="sorting.key_value" class="whitespace-pre">
        Name or ID
        <span class="font-bold">"{{ sorting.key_value }}"</span>
      </li>

      <li v-if="sorting.region !== enum_region.NONE">
        region
        <span class="font-bold whitespace-pre">{{ sorting.region }}</span>
      </li>

      <li
        v-if="sorting.types.length > 0 && sorting.types[0] !== enum_type.NONE"
      >
        type(s)
        <span v-for="(type, index) in sorting.types" :key="index">
          <span class="font-bold whitespace-pre"> {{ type }}</span>
          <span v-if="sorting.types.length - 1 != index">, </span>
          <span v-else> </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { enum_type, enum_region } from "../constants/enums";

export default {
  setup() {
    const { state } = useStore();

    const pokemonsNumber = computed(() => state.pokemon.allPokemons.count);
    const sorting = computed(() => state.pokemon.filteredPokemons.sorting);

    return { pokemonsNumber, sorting, enum_type, enum_region };
  },
};
</script>

<style lang="scss" scoped></style>
