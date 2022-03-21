<template>
  <div>
    <TheCursor />

    <IsLoading />

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
import TheCursor from "../components/TheCursor.vue";
import IsLoading from "../components/IsLoading.vue";

export default {
  name: "Home",
  components: {
    TheFooter,
    TheHeader,
    TheMain,
    TheCursor,
    IsLoading,
  },
};
</script>
