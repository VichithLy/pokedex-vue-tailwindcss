<template>
  <div
    class="flex flex-row items-center gap-3 my-10 w-5/6 justify-start flex-wrap"
  >
    <div class="flex flex-row gap-2 items-center">
      <div class="font-bold whitespace-nowrap">Sort by</div>
      <button
        class="sort-btn"
        :class="{
          'sort-btn-active': selectedSort == 'id',
        }"
        @click="sortBy('id')"
      >
        <span>ID</span>
      </button>
    </div>

    <button
      class="sort-btn"
      :class="{
        'sort-btn-active': selectedSort == 'name',
      }"
      @click="sortBy('name')"
    >
      <span>Name</span>
    </button>

    <div class="flex flex-row gap-2 items-center cursor-pointer">
      <div class="font-bold whitespace-nowrap">Order by</div>
      <div class="sort-btn" @click="orderBy()">
        <svg
          v-if="selectedOrder == 'desc'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 13l-5 5m0 0l-5-5m5 5V6"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7 11l5-5m0 0l5 5m-5-5v12"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import pokemonsArray from "@/data/pokemons_array.json";
import { mapActions, mapState } from "vuex";
import { sort } from "../constants/types";
import {
  SET_POKEMONS_BY_NAME_DESC,
  SET_POKEMONS_BY_NAME_ASC,
  SET_POKEMONS_BY_ID_ASC,
  SET_POKEMONS_BY_ID_DESC,
} from "../store/mutation-action-types";

export default {
  data() {
    return {
      pokemonsArray,
      selectedSort: "",
      selectedOrder: "",
    };
  },
  computed: {
    ...mapState("pokemon", ["filteredPokemons"]),
  },
  mounted() {
    const isSortedBy = this.filteredPokemons.isSortedBy2;

    switch (isSortedBy) {
      case sort.NAME_ASC:
        this.selectedSort = "name";
        this.selectedOrder = "asc";
        break;
      case sort.NAME_DESC:
        this.selectedSort = "name";
        this.selectedOrder = "desc";
        break;
      case sort.ID_ASC:
        this.selectedSort = "id";
        this.selectedOrder = "asc";
        break;
      case sort.ID_DESC:
        this.selectedSort = "id";
        this.selectedOrder = "desc";
        break;
      default:
        break;
    }
  },

  methods: {
    ...mapActions("pokemon", [
      SET_POKEMONS_BY_NAME_DESC,
      SET_POKEMONS_BY_NAME_ASC,
      SET_POKEMONS_BY_ID_DESC,
      SET_POKEMONS_BY_ID_ASC,
    ]),
    sortBy(key) {
      if (this.selectedSort == key) return;

      if (key == "id") {
        this.selectedSort = "id";

        this.selectedOrder == "asc"
          ? this.SET_POKEMONS_BY_ID_ASC()
          : this.SET_POKEMONS_BY_ID_DESC();

        return;
      }

      if (key == "name") {
        this.selectedSort = "name";

        this.selectedOrder == "asc"
          ? this.SET_POKEMONS_BY_NAME_ASC()
          : this.SET_POKEMONS_BY_NAME_DESC();

        return;
      }
    },
    orderBy() {
      this.selectedOrder === "asc"
        ? (this.selectedOrder = "desc")
        : (this.selectedOrder = "asc");

      if (this.selectedSort === "name") {
        this.selectedOrder == "asc"
          ? this.SET_POKEMONS_BY_NAME_ASC()
          : this.SET_POKEMONS_BY_NAME_DESC();
      }

      if (this.selectedSort === "id") {
        this.selectedOrder == "asc"
          ? this.SET_POKEMONS_BY_ID_ASC()
          : this.SET_POKEMONS_BY_ID_DESC();
      }
    },
  },
};
</script>

<style></style>
