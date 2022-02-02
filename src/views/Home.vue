<template>
  <div class="home">
    This the Home page. <br />

    <TheHeader />

    <TheMain />

    <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from "../components/TheHeader.vue";
import TheMain from "../components/TheMain.vue";
import TheFooter from "../components/TheFooter.vue";

export default {
  name: "Home",
  components: {
    TheHeader,
    TheFooter,
    TheMain,
  },
};
</script>
