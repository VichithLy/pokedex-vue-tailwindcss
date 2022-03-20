<template>
  <div
    class="w-full justify-center place-items-center cursor-pointer mt-6 flex md:hidden"
    @click="toggle()"
  >
    <h3 class="peer font-semibold">Advanced search</h3>

    <!-- Arrow icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 ml-1 duration-200"
      :class="isOpen && 'rotate-180'"
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
import { mapActions, mapState } from "vuex";
import { UPDATE_IS_OPEN } from "../../../store/mutation-action-types";
import { smoothScrollTo } from "../../../utils";

export default {
  computed: {
    ...mapState("accordion", ["isOpen"]),
  },
  methods: {
    ...mapActions("accordion", [UPDATE_IS_OPEN]),
    // To scroll to an element in the DOM
    smoothScrollTo,
    /**
     * To toggle the sorting section
     */
    toggle: function () {
      this.UPDATE_IS_OPEN(!this.isOpen);
      if (this.isOpen == true) this.smoothScrollTo("sorting-section");
    },
  },
};
</script>

<style></style>
