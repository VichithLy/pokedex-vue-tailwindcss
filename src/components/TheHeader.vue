<template>
  <header>
    This is the TheHeader component. <br />
    <!-- Logo -->

    <SearchBar />

    <SortByRegion />

    <SortByType />
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
