<template>
  <div class="flex flex-col mb-16">
    <div class="sc-list-container">
      <SimpleCard
        v-for="(pokemon, index) in pokemons"
        :key="index"
        :pokemon-object="pokemon"
      />
    </div>

    <div class="flex justify-center mt-12">
      <!-- Load More button -->
      <button
        class="btn-primary"
        :class="
          (isInfiniteScroll && ['fixed', 'bottom-5', 'left-5']) || 'btn-primary'
        "
        @click="handleOnLoadMoreClick()"
      >
        {{ isInfiniteScroll ? "Disable" : "Enable" }} Load More
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import SimpleCard from "./SimpleCard.vue";
import {
  GET_POKEMONS,
  SET_ALL_POKEMONS,
} from "../../../store/mutation-action-types";
// import { outerHeight } from "../../../utils";

export default {
  components: { SimpleCard },

  //Composition API
  async setup() {
    // Access states and actions in store
    const { state, dispatch } = useStore();

    const pokemons = computed(() => state.pokemon.filteredPokemons.results);

    const setAllPokemons = () => dispatch("pokemon/" + SET_ALL_POKEMONS);
    const getPokemons = () => dispatch("pokemon/" + GET_POKEMONS);
    try {
      // For Suspense component
      // await dispatch("pokemon/" + GET_POKEMONS);
    } catch (error) {
      console.log(error);
    }

    return { pokemons, setAllPokemons, getPokemons };
  },

  data() {
    return {
      isInfiniteScroll: false,
    };
  },

  mounted() {
    // Get all the pokemons from the api,
    // then display the first 20

    // ! TO COMMENT WHEN DEV
    this.setAllPokemons().then(() => {
      this.getPokemons();
    });

    // Detect when scrolled to bottom.
    window.addEventListener("scroll", () => this.loadMorePokemons());
  },
  unmounted() {
    window.removeEventListener("scroll", () => this.loadMorePokemons());
  },

  methods: {
    loadMorePokemons() {
      //const footer = document.getElementById("footer");
      // To trigger the "load more" at the the end of the list

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const bottomOfWindow = scrollTop + clientHeight >= scrollHeight;

      //console.log("bottomOfWindow", bottomOfWindow);

      if (bottomOfWindow && this.isInfiniteScroll) this.getPokemons();
    },
    handleOnLoadMoreClick() {
      this.isInfiniteScroll = !this.isInfiniteScroll;

      // ! If we allow this, it can trigger getPokemons() twice
      // if (this.isInfiniteScroll) this.getPokemons();
    },
  },
};
</script>
