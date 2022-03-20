<template>
  <div class="relative w-full">
    <input
      :id="'toggle-' + inputValue"
      v-model="selectedTypes"
      type="checkbox"
      :value="inputValue"
      class="absolute peer w-full h-full left-0 right-0 appearance-none"
    />

    <!-- :disabled="
        selectedTypes.length >= 2 && !selectedTypes.includes(inputValue)
      " -->

    <!-- The label looks like a button -->
    <label
      :for="'toggle-' + inputValue"
      class="flex relative rounded-full border-4 cursor-pointer z-10 ease-in-out hover:scale-105 select-none capitalize place-content-center py-0.5 items-start font-medium shadow-xl px-2"
      :class="'btn-type-' + inputValue"
    >
      {{ inputValue }}
    </label>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  SET_LAST_TYPE,
  UPDATE_SELECTED_TYPES,
} from "../../../store/mutation-action-types";

export default {
  props: {
    inputValue: {
      type: String,
      required: true,
      default: "",
    },
  },
  computed: {
    // Checked types
    selectedTypes: {
      get() {
        return this.$store.state.sorting.selectedTypes;
      },
      set(value) {
        const MAX_NUMBER = 2;
        if (this.selectedTypes.length < MAX_NUMBER) {
          this.UPDATE_SELECTED_TYPES(value);
        } else if (this.selectedTypes.length >= 2) {
          this.SET_LAST_TYPE(value[value.length - 1]);
        } else {
          alert("Cannot check more than " + MAX_NUMBER + " checkboxes.");
        }
      },
    },
  },
  methods: {
    ...mapActions("sorting", [UPDATE_SELECTED_TYPES, SET_LAST_TYPE]),
  },
};
</script>

<style scoped></style>
