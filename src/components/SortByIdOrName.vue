<template>
  <div class="flex flex-row items-center gap-3 my-10 w-5/6">
    <div class="font-bold">Sort by</div>
    <button class="sort-btn" @click="sortById()">ID</button>
    <button class="sort-btn" @click="sortByName()">Name</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemonsArray: [
        { id: 1, name: "bulbasaur" },
        { id: 2, name: "ivysaur" },
        { id: 3, name: "venusaur" },
        { id: 4, name: "charmander" },
        { id: 5, name: "charmeleon" },
        { id: 6, name: "charizard" },
      ],
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
