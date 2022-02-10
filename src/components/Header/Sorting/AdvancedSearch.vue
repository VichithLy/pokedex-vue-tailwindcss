<template>
  <div
    class="w-full justify-center place-items-center cursor-pointer mt-5 flex sm:hidden"
    @click="toggle()"
  >
    <h3 class="peer font-semibold">Advanced search</h3>

    <!-- Arrow icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 ml-1 duration-200"
      :class="[isOpen ? 'rotate-180' : '']"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import scrollTo from "../../../utils";

export default {
  computed: {
    ...mapState(["isOpen"]),
  },
  methods: {
    ...mapMutations(["updateIsOpen"]),
    // To scroll to an element id in the DOM
    scrollTo,
    /**
     * To toggle the sorting section
     */
    toggle: function () {
      this.updateIsOpen({ isOpen: !this.isOpen });
      if (this.isOpen == true) this.scrollTo("sorting-section");
    },
  },
};
</script>

<style></style>
