<template>
  <div
    class="flex flex-auto justify-end flex-row items-center gap-3 whitespace-nowrap flex-wrap"
  >
    <div class="flex flex-row gap-2 items-center">
      <div class="font-bold whitespace-nowrap">Sort by</div>
      <button
        class="sort-btn"
        :class="{
          'sort-btn-active': selectedKey == enum_key.ID,
        }"
        @click="onKeyClick(enum_key.ID)"
      >
        <span>ID</span>
      </button>
    </div>

    <button
      class="sort-btn"
      :class="{
        'sort-btn-active': selectedKey == enum_key.NAME,
      }"
      @click="onKeyClick(enum_key.NAME)"
    >
      <span>Name</span>
    </button>

    <div class="flex flex-row gap-2 items-center cursor-pointer">
      <div class="font-bold whitespace-nowrap">Order by</div>
      <div class="sort-btn" @click="onOrderClick()">
        <svg
          v-if="selectedOrder === enum_order.DESC"
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
import { enum_sort, enum_key, enum_order } from "../constants/enums";
import {
  SET_POKEMONS_BY_NAME_DESC,
  SET_POKEMONS_BY_NAME_ASC,
  SET_POKEMONS_BY_ID_ASC,
  SET_POKEMONS_BY_ID_DESC,
  UPDATE_IS_LOADING,
} from "../store/mutation-action-types";
import debounce from "lodash.debounce";

export default {
  data() {
    return {
      pokemonsArray,
      selectedKey: "",
      selectedOrder: "",
      enum_sort,
      enum_key,
      enum_order,
    };
  },
  computed: {
    ...mapState("pokemon", ["filteredPokemons"]),
  },
  mounted() {
    const sortingKey = this.filteredPokemons.sorting.key;
    const sortingOrder = this.filteredPokemons.sorting.order;

    switch (sortingKey) {
      case enum_key.NAME:
        switch (sortingOrder) {
          case enum_order.ASC:
            this.selectedKey = enum_key.NAME;
            this.selectedOrder = enum_order.ASC;
            break;

          case enum_order.DESC:
            this.selectedKey = enum_key.NAME;
            this.selectedOrder = enum_order.DESC;
            break;

          default:
            break;
        }
        break;

      case enum_key.ID:
        switch (sortingOrder) {
          case enum_order.ASC:
            this.selectedKey = enum_key.ID;
            this.selectedOrder = enum_order.ASC;
            break;

          case enum_order.DESC:
            this.selectedKey = enum_key.ID;
            this.selectedOrder = enum_order.DESC;
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }

    // Debounce
    this.orderBy = debounce(function () {
      this.selectedOrder === enum_order.ASC
        ? (this.selectedOrder = enum_order.DESC)
        : (this.selectedOrder = enum_order.ASC);

      if (this.selectedKey === enum_key.NAME) {
        this.selectedOrder == enum_order.ASC
          ? this.SET_POKEMONS_BY_NAME_ASC()
          : this.SET_POKEMONS_BY_NAME_DESC();
      }

      if (this.selectedKey === enum_key.ID) {
        this.selectedOrder == enum_order.ASC
          ? this.SET_POKEMONS_BY_ID_ASC()
          : this.SET_POKEMONS_BY_ID_DESC();
      }
    }, 250);

    this.sortBy = debounce(function (key) {
      if (this.selectedKey == key) return;

      if (key == enum_key.ID) {
        this.selectedKey = enum_key.ID;

        this.selectedOrder == enum_order.ASC
          ? this.SET_POKEMONS_BY_ID_ASC()
          : this.SET_POKEMONS_BY_ID_DESC();

        return;
      }

      if (key == enum_key.NAME) {
        this.selectedKey = enum_key.NAME;

        this.selectedOrder == enum_order.ASC
          ? this.SET_POKEMONS_BY_NAME_ASC()
          : this.SET_POKEMONS_BY_NAME_DESC();

        return;
      }
    }, 250);
  },
  methods: {
    ...mapActions("pokemon", [
      SET_POKEMONS_BY_NAME_DESC,
      SET_POKEMONS_BY_NAME_ASC,
      SET_POKEMONS_BY_ID_DESC,
      SET_POKEMONS_BY_ID_ASC,
      UPDATE_IS_LOADING,
    ]),
    onOrderClick() {
      this.UPDATE_IS_LOADING(true);
      this.orderBy();
    },
    onKeyClick(key) {
      this.UPDATE_IS_LOADING(true);
      this.sortBy(key);
    },
  },
};
</script>

<style></style>
