<template>
  <label class="relative flex justify-between items-center font-medium"
    ><span class="pr-2 capitalize">{{ inputValue }}</span>

    <input
      v-model="selectedRegions"
      type="checkbox"
      class="absolute left-0 right-0 w-full h-full peer cursor-pointer appearance-none"
      :value="inputValue"
    />
    <!-- Switch appearance -->
    <span
      class="bg-gray-400 w-11 h-7 rounded-full flex flex-shrink-0 items-center after:bg-white after:h-5 after:w-5 after:rounded-full p-1 peer-checked:bg-pokemon-blue-500 peer-checked:after:translate-x-4 ease-in-out duration-75 after:duration-75"
    ></span>
  </label>
</template>

<script>
export default {
  props: {
    // Value of the input & Label text
    inputValue: {
      type: String,
      required: true,
      default: "",
    },
  },
  computed: {
    // Checked regions
    selectedRegions: {
      get() {
        return this.$store.state.sorting.selectedRegions;
      },
      set(value) {
        this.$store.commit("sorting/UPDATE_SELECTED_REGIONS", value);
        return 0; // Avoid computed property error
      },
    },
  },
};
</script>

<style></style>
