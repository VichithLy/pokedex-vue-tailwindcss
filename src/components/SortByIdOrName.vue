<template>
  <div class="flex flex-row items-center gap-3 my-10 w-5/6">
    <div class="font-bold">Sort by</div>
    <button
      class="sort-btn"
      :class="{
        'sort-btn-active': selectedSort == 'id',
      }"
      @click="sortBy('id')"
    >
      <span>ID</span>

      <svg
        v-if="idBtnState == 'desc'"
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
        v-if="idBtnState == 'asc'"
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
    </button>

    <button
      class="sort-btn w-28"
      :class="{
        'sort-btn-active': selectedSort == 'name',
      }"
      @click="sortBy('name')"
    >
      <span>Name</span>

      <svg
        v-if="nameBtnState == 'desc'"
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
        v-if="nameBtnState == 'asc'"
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
    </button>
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
      idBtnState: "asc",
      nameBtnState: "asc",
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
        this.nameBtnState = "asc";
        break;
      case sort.NAME_DESC:
        this.selectedSort = "name";
        this.nameBtnState = "desc";
        break;
      case sort.ID_ASC:
        this.selectedSort = "id";
        this.idBtnState = "asc";
        break;
      case sort.ID_DESC:
        this.selectedSort = "id";
        this.idBtnState = "desc";
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
      // TODO Case when selectedSort changes
      if (key == "id") {
        this.selectedSort = "id";

        if (this.idBtnState == "asc") {
          this.idBtnState = "desc";
          this.SET_POKEMONS_BY_ID_DESC();
        } else {
          this.SET_POKEMONS_BY_ID_ASC();
          this.idBtnState = "asc";
        }
      } else if (key == "name") {
        this.selectedSort = "name";

        if (this.nameBtnState == "asc") {
          this.nameBtnState = "desc";
          this.SET_POKEMONS_BY_NAME_DESC();
        } else {
          this.nameBtnState = "asc";
          this.SET_POKEMONS_BY_NAME_ASC();
        }
      }
    },
  },
};
</script>

<style></style>
