<template>
  <header id="header" class="bg-pokemon-red-300 py-6">
    <div class="container-auto-center">
      <BaseLogo />
      <MainForm />
      <AdvancedSearch />
    </div>
  </header>
</template>

<script>
import BaseLogo from "../Base/BaseLogo.vue";
import AdvancedSearch from "./Sorting/AdvancedSearch.vue";
import MainForm from "./MainForm.vue";

export default {
  name: "TheHeader",
  components: {
    BaseLogo,
    AdvancedSearch,
    MainForm,
  },
};
</script>

<style scoped></style>
