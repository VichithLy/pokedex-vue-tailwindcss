<template>
  <header
    class="flex flex-col justify-center items-center border-red-400 border-2 py-10"
  >
    <!-- Logo -->
    <!-- Put a link to Home page -->
    <img class="w-60" src="../assets/images/logo.png" alt="logo" srcset="" />

    <div class="w-5/6 mt-12">
      <SearchBar />

      <div class="flex flex-wrap justify-between gap-x-5 mt-6 box-border">
        <SortByRegion />
        <SortByType />
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

<style></style>
