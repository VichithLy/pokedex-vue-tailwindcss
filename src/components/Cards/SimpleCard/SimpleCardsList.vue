<template>
  <div id="cards-list" class="flex flex-col mb-16 items-center">
    <ErrorMessage
      v-if="error"
      :message="'Oh no! Pokémon are hiding somewhere...'"
    />

    <div v-else class="sc-list-container">
      <ErrorMessage
        v-if="listStatus === enum_status.NO_RESULTS"
        :message="'No results found !'"
      />

      <SimpleCard
        v-for="(pokemon, index) in pokemons"
        v-else
        :key="index"
        :pokemon-object="pokemon"
      />
    </div>

    <div
      v-show="
        listStatus === enum_status.CAN_LOAD_MORE &&
        pokemons.length > 0 &&
        !error
      "
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import SimpleCard from "./SimpleCard.vue";
import {
  GET_POKEMONS,
  SET_ALL_POKEMONS,
} from "../../../store/mutation-action-types";
import debounce from "lodash.debounce";
import { enum_status, enum_sort } from "../../../constants/enums";
// https://www.pngitem.com/middle/iTbmmRw_surprised-pikachu-meme-hd-png-download/
import pikaSurprised from "../../../assets/images/pika_surprised.png";
import ErrorMessage from "../../ErrorMessage.vue";

export default {
  components: { SimpleCard, ErrorMessage },
  //Composition API
  async setup() {
    // Access states and actions in store
    const { state, dispatch } = useStore();

    const searchedPokemon = computed(() => state.pokemon.searchedPokemon);
    const pokemons = computed(() => state.pokemon.filteredPokemons.results);
    const pokemonsNumber = computed(() => state.pokemon.allPokemons.count);
    const listStatus = computed(() => state.pokemon.filteredPokemons.status);
    const sorting = computed(() => state.pokemon.filteredPokemons.sorting);

    // Error handling
    const error = ref(null);

    try {
      await dispatch("pokemon/" + SET_ALL_POKEMONS);
      await dispatch("pokemon/" + GET_POKEMONS);
    } catch (e) {
      error.value = e;
    }

    return {
      error,
      searchedPokemon,
      pokemons,
      sorting,
      pokemonsNumber,
      listStatus,
      getPokemons: () => dispatch("pokemon/" + GET_POKEMONS),
    };
  },

  data() {
    return {
      isInfiniteScroll: false,
      enum_status,
      enum_sort,
      pikaSurprised,
    };
  },

  mounted() {
    // Detect when scrolled to bottom.
    window.addEventListener("scroll", () => {
      if (this.listStatus !== enum_status.CANNOT_LOAD_MORE)
        this.loadMorePokemons();
    });
  },
  unmounted() {
    window.removeEventListener("scroll", () => this.loadMorePokemons());
  },

  methods: {
    loadMorePokemons: debounce(function () {
      // If footer outer height needed
      // const footer = document.getElementById("footer");

      // To trigger the "load more" at the the end of the list
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      // We remove 100px more for some mobile devices
      const bottomOfWindow = scrollTop + clientHeight >= scrollHeight - 100;

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
