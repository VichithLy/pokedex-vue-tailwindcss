<template>
  <header
    class="
      flex flex-col
      justify-center
      items-center
      bg-pokemon-red-300
      pt-10
      pb-5
    "
  >
    <BaseLogo />

    <div class="w-5/6 mt-8 h-auto">
      <SearchBar />
      <SortingAccordion />
    </div>

    <AdvancedSearch />
  </header>
</template>

<script>
import SortingAccordion from "./SortingAccordion.vue";
import BaseLogo from "../Base/BaseLogo.vue";
import SearchBar from "../SearchBar.vue";
import AdvancedSearch from "../Header/AdvancedSearch.vue";

export default {
  name: "TheHeader",
  components: {
    SortingAccordion,
    BaseLogo,
    SearchBar,
    AdvancedSearch,
  },
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
