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
        class="btn-primary w-1/3"
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
    // Detect when scrolled to bottom.
    window.addEventListener("scroll", () => this.loadMorePokemons());
  },
  unmounted() {
    window.removeEventListener("scroll", () => this.loadMorePokemons());
  },
  methods: {
    loadMorePokemons() {
      // To trigger the "load more" at the the end of the list
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight;

      console.log("bottomOfWindow", bottomOfWindow);

      if (bottomOfWindow && this.isInfiniteScroll) this.getPokemons();
    },
    handleOnLoadMoreClick() {
      this.isInfiniteScroll = !this.isInfiniteScroll;
      this.isInfiniteScroll && this.getPokemons();
    },
  },
};
</script>
