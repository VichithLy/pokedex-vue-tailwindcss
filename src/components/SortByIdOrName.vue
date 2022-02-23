<template>
  <div class="flex flex-row items-center gap-3 my-10 w-5/6">
    <div class="font-bold">Sort by</div>
    <button class="sort-btn" @click="sortById()">ID</button>
    <button class="sort-btn" @click="sortByName()">Name</button>
  </div>
</template>

<script>
import pokemonsArray from "@/constants/pokemons_array.json";

export default {
  data() {
    return {
      pokemonsArray,
    };
  },
  methods: {
    sortByName() {
      this.pokemonsArray.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log(this.pokemonsArray);
    },
    sortById() {
      this.pokemonsArray.sort((a, b) => a.id - b.id);
      console.log(this.pokemonsArray);
    },
  },
};
</script>

<style></style>
