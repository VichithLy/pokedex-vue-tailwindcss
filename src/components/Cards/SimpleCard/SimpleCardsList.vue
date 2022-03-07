<template>
  <div class="sc-list-container">
    <SimpleCard
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :pokemon-object="pokemon"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import SimpleCard from "./SimpleCard.vue";
import { GET_POKEMONS } from "../../../store/mutation-types";

export default {
  components: { SimpleCard },
  //Composition API
  async setup() {
    // Access states and actions in store
    const { state, dispatch } = useStore();

    const pokemons = computed(() => state.pokemon.pokemons);

    try {
      // For Suspense component
      await dispatch("pokemon/" + GET_POKEMONS);
    } catch (error) {
      console.log(error);
    }

    return { pokemons };
  },
};
</script>
