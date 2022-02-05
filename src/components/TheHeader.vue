<template>
  <header
    class="
      flex flex-col
      justify-center
      items-center
      border-red-400 border-2
      py-10
    "
  >
    <!-- Logo -->
    <!-- Put a link to Home page -->
    <router-link to="/">
      <img class="w-60" src="../assets/images/logo.png" alt="logo" srcset="" />
    </router-link>

    <div class="w-5/6 mt-12">
      <SearchBar />

      <div class="flex flex-wrap gap-y-5 gap-x-5 mt-6 items-start">
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
