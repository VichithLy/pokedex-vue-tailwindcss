<template>
  <div class="flex flex-col">
    <button
      class="border-2 border-black p-5"
      @click="isInfiniteScroll = !isInfiniteScroll"
    >
      Activate infinite scroll : {{ isInfiniteScroll }}
    </button>

    <div class="sc-list-container">
      <SimpleCard
        v-for="(pokemon, index) in pokemons"
        :key="index"
        :pokemon-object="pokemon"
      />
    </div>

    <button class="border-2 border-black p-5" @click="getPokemons()">
      LOAD MORE
    </button>
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

  data() {
    return {
      isInfiniteScroll: false,
    };
  },

  mounted() {
    // Get the height (padding + margin) of the footer
    function outerHeight(element) {
      const height = element.offsetHeight,
        style = window.getComputedStyle(element);

      return ["top", "bottom"]
        .map((side) => parseInt(style[`margin-${side}`]))
        .reduce((total, side) => total + side, height);
    }
    const footer = document.getElementById("footer");

    // Detect when scrolled to bottom.
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight - outerHeight(footer);

      console.log("bottomOfWindow", bottomOfWindow);

      if (bottomOfWindow && this.isInfiniteScroll) this.getPokemons();
    };
  },
};
</script>
