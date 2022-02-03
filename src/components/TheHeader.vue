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
    <img
      class="border-blue-500 border-2 w-60"
      src="../assets/images/logo.png"
      alt="logo"
      srcset=""
    />

    <div class="w-5/6 mt-12">
      <SearchBar />

      <div class="flex flex-wrap gap-x-10 border-purple-600 border-2 mt-6">
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
