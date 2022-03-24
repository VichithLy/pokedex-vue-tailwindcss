<template>
  <div class="w-5/6 mt-8 h-auto">
    <form @submit.prevent="checkForm()" @keyup.enter="checkForm">
      <SearchBar />
      <SortingAccordion />
    </form>
  </div>
</template>

<script>
import SortingAccordion from "./Sorting/SortingAccordion.vue";
import SearchBar from "./SearchBar.vue";
import debounce from "lodash.debounce";
import { mapActions, mapState } from "vuex";
import {
  SET_POKEMONS_BY_NAME_OR_ID,
  SET_POKEMONS_BY_REGION,
  SET_POKEMONS_BY_REGION_AND_TYPES,
  SET_POKEMONS_BY_TYPES,
  SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID,
  UPDATE_IS_LOADING,
  UPDATE_IS_OPEN,
} from "../../store/mutation-action-types";

export default {
  components: { SortingAccordion, SearchBar },
  computed: {
    ...mapState("sorting", ["selectedRegion", "selectedTypes"]),
  },
  mounted() {
    this.setPokemons = debounce(function () {
      this.SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID().then(() => {
        this.UPDATE_IS_OPEN(false);
      });
    }, 1000);
  },
  methods: {
    ...mapActions("pokemon", [
      SET_POKEMONS_BY_NAME_OR_ID,
      SET_POKEMONS_BY_REGION,
      SET_POKEMONS_BY_TYPES,
      SET_POKEMONS_BY_REGION_AND_TYPES,
      SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID,
      UPDATE_IS_LOADING,
    ]),
    ...mapActions("accordion", [UPDATE_IS_OPEN]),
    checkForm() {
      this.UPDATE_IS_LOADING(true);
      this.setPokemons();
    },
  },
};
</script>

<style lang="scss" scoped></style>
