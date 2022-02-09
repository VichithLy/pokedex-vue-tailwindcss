<template>
  <label class="relative flex justify-between items-center font-medium"
    ><span class="pr-2 capitalize">{{ inputValue }}</span>

    <input
      v-model="model"
      type="checkbox"
      class="absolute left-0 right-0 w-full h-full peer cursor-pointer appearance-none"
      :value="inputValue"
    />
    <!-- Switch appearance -->
    <span
      class="bg-gray-400 w-11 h-7 rounded-full flex flex-shrink-0 items-center after:bg-white after:h-5 after:w-5 after:rounded-full p-1 peer-checked:bg-pokemon-blue-500 peer-checked:after:translate-x-4 ease-in-out duration-100 after:duration-100"
    ></span>
  </label>
</template>

<script>
export default {
  name: "BaseToggleSwitch",
  props: {
    // Value of the input & Label text
    inputValue: {
      type: String,
      required: true,
      default: "",
    },
    modelValue: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  // To update selectedTypes in the parent component
  emits: ["update:modelValue"],
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style></style>
