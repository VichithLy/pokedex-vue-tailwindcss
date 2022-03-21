<template>
  <div
    v-if="isLoading"
    class="z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <div
      class="flex flex-col justify-center items-center bg-black bg-opacity-60 p-4 rounded-lg"
    >
      <div class="text-xl animate-pulse text-white font-bold">Loading...</div>
      <img class="animate-spin" :src="pokeballImg" />
    </div>
  </div>
</template>

<script>
import pokeballImg from "../assets/images/cursor/pokeball.png";

export default {
  data() {
    return {
      isLoading: false,
      pokeballImg,
    };
  },
};
</script>

<style scoped></style>
