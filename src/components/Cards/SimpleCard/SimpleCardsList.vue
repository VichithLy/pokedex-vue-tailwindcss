<template>
  <div class="sc-list-container mb-10">
    <SimpleCard
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :pokemon-object="pokemon"
    />
  </div>
  <button class="border-2 border-black p-5" @click="getPokemons()">
    LOAD MORE
  </button>
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

    const pokemons = computed(() => state.pokemon.filteredPokemons.results);

    const getPokemons = () => dispatch("pokemon/" + GET_POKEMONS);

    try {
      // For Suspense component
      // await dispatch("pokemon/" + GET_POKEMONS);
    } catch (error) {
      console.log(error);
    }

    return { pokemons, getPokemons };
  },
};
</script>
