<template>
  <svg
    v-show="userHasScrolled"
    xmlns="http://www.w3.org/2000/svg"
    class="h-12 w-12 fixed bottom-5 right-5 cursor-pointer text-pokemon-blue-500"
    viewBox="0 0 20 20"
    fill="currentColor"
    @click="smoothScrollTo('header')"
  >
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
      clip-rule="evenodd"
    />
  </svg>
</template>

<script>
import { smoothScrollTo } from "../utils";

export default {
  data() {
    return {
      userHasScrolled: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", () => this.updateUserHasScrolled());
  },
  unmounted() {
    window.removeEventListener("scroll", () => this.updateUserHasScrolled());
  },
  methods: {
    smoothScrollTo,
    updateUserHasScrolled() {
      // When the user scrolls down 20px from the top of the document, show the button
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        this.userHasScrolled = true;
      } else {
        this.userHasScrolled = false;
      }
    },
  },
};
</script>

<style scoped></style>
