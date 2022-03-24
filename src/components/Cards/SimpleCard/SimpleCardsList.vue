<template>
  <div id="cards-list" class="flex flex-col mb-16 justify-center items-center">
    <div v-if="pokemons.length !== 0" class="sc-list-container">
      <SimpleCard
        v-for="(pokemon, index) in pokemons"
        :key="index"
        :pokemon-object="pokemon"
      />
    </div>

    <div v-else class="w-2/6 flex flex-col items-center gap-4">
      <img :src="pikaSurprised" alt="pika-surprised" />
      <div class="text-center font-bold text-xl">No results found !</div>
    </div>

    <div
      v-show="listStatus !== status.CANNOT_LOAD_MORE && pokemons.length !== 0"
      class="flex justify-center mt-12"
    >
      <!-- Load More button -->
      <button
        class="btn-primary px-3 w-auto"
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
import { outerHeight } from "../../../utils";
import debounce from "lodash.debounce";
import { status } from "../../../constants/types";
// https://www.pngitem.com/middle/iTbmmRw_surprised-pikachu-meme-hd-png-download/
import pikaSurprised from "../../../assets/images/pika_surprised.png";

export default {
  components: { SimpleCard },
  //Composition API
  async setup() {
    // Access states and actions in store
    const { state, dispatch } = useStore();

    const pokemons = computed(() => state.pokemon.filteredPokemons.results);
    const listStatus = computed(() => state.pokemon.filteredPokemons.status);

    await dispatch("pokemon/" + SET_ALL_POKEMONS);
    await dispatch("pokemon/" + GET_POKEMONS);

    return {
      pokemons,
      listStatus,
      getPokemons: () => dispatch("pokemon/" + GET_POKEMONS),
    };
  },

  data() {
    return {
      isInfiniteScroll: false,
      status,
      pikaSurprised,
    };
  },

  mounted() {
    // Detect when scrolled to bottom.
    window.addEventListener("scroll", () => {
      if (this.listStatus !== status.CANNOT_LOAD_MORE) this.loadMorePokemons();
    });
  },
  unmounted() {
    window.removeEventListener("scroll", () => this.loadMorePokemons());
  },

  methods: {
    loadMorePokemons: debounce(function () {
      const footer = document.getElementById("footer");
      // To trigger the "load more" at the the end of the list

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const bottomOfWindow =
        scrollTop + clientHeight >= scrollHeight - outerHeight(footer);

      //console.log("bottomOfWindow", bottomOfWindow);

      if (bottomOfWindow && this.isInfiniteScroll) this.getPokemons();
    }, 100),
    handleOnLoadMoreClick() {
      this.isInfiniteScroll = !this.isInfiniteScroll;

      // ! If we allow this, it can trigger getPokemons() twice
      // if (this.isInfiniteScroll) this.getPokemons();
    },
  },
};
</script>
