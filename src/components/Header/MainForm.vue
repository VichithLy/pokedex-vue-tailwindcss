<template>
  <div class="w-5/6 mt-8 h-auto">
    <form @submit.prevent="checkForm()">
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
} from "../../store/mutation-action-types";

export default {
  components: { SortingAccordion, SearchBar },
  computed: {
    ...mapState("sorting", ["selectedRegion", "selectedTypes"]),
  },
  methods: {
    ...mapActions("pokemon", [
      SET_POKEMONS_BY_NAME_OR_ID,
      SET_POKEMONS_BY_REGION,
      SET_POKEMONS_BY_TYPES,
      SET_POKEMONS_BY_REGION_AND_TYPES,
      SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID,
    ]),
    checkForm: debounce(function () {
      this.SET_POKEMONS_BY_REGION_TYPES_AND_NAME_OR_ID();
    }, 1000),
  },
};
</script>

<style lang="scss" scoped></style>
