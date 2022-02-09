<template>
  <div>
    <TheHeader />

    <TheMain />

    <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from "../components/Header/TheHeader.vue";
import TheMain from "../components/TheMain.vue";
import TheFooter from "../components/TheFooter.vue";

export default {
  name: "Home",
  components: {
    TheFooter,
    TheHeader,
    TheMain,
  },
};
</script>
