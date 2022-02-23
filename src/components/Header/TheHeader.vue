<template>
  <header id="header" class="bg-pokemon-red-300 md:py-10">
    <div class="container-auto-center">
      <BaseLogo />

      <div class="w-5/6 mt-8 h-auto">
        <SearchBar />
        <SortingAccordion />
      </div>

      <AdvancedSearch />
    </div>
  </header>
</template>

<script>
import SortingAccordion from "./Sorting/SortingAccordion.vue";
import BaseLogo from "../Base/BaseLogo.vue";
import SearchBar from "./SearchBar.vue";
import AdvancedSearch from "./Sorting/AdvancedSearch.vue";

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

<style scoped></style>
