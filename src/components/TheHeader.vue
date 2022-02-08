<template>
  <header
    class="flex flex-col justify-center items-center bg-pokemon-red-400 py-10"
  >
    <!-- Logo -->
    <router-link to="/">
      <img class="w-60" src="../assets/images/logo.png" alt="logo" srcset="" />
    </router-link>

    <!-- Search & Sort -->
    <div class="w-5/6 mt-12">
      <SearchBar />
      <div class="flex flex-wrap gap-y-5 gap-x-5 mt-6 items-start">
        <SortByRegion />
        <SortByType />
      </div>

      <!-- Reset & Confirm -->
      <div class="flex justify-between pt-6">
        <button class="btn-secondary">Reset</button>
        <button class="btn-primary">Confirm</button>
      </div>
    </div>
  </header>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import SortByRegion from "./SortByRegion.vue";
import SortByType from "./SortByType.vue";

export default {
  name: "TheHeader",
  components: { SearchBar, SortByType, SortByRegion },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap");

* {
  /* font-family: "Press Start 2P", cursive; */
  /* font-family: "Quicksand", sans-serif; */
  /* font-family: "Fredoka One", cursive; */
  font-family: "Nunito", sans-serif;
  /* font-family: "Balsamiq Sans", cursive; */
}
</style>
