<template>
  <label class="relative flex flex-wrap justify-between items-center"
    ><span class="pr-2">{{ label }}</span>
    <input
      v-model="model"
      type="checkbox"
      class="absolute left-0 right-0 w-full h-full peer appearance-none"
      :value="inputValue"
    />
    <span
      class="
        bg-gray-300
        w-11
        h-7
        rounded-full
        flex flex-shrink-0
        items-center
        after:bg-white after:h-5 after:w-5 after:rounded-full
        p-1
        peer-checked:bg-green-500 peer-checked:after:translate-x-4
        ease-in-out
        duration-300
        after:duration-300
      "
    ></span>
  </label>
</template>

<script>
export default {
  name: "BaseToggleSwitch",
  props: {
    label: {
      type: String,
      required: true,
      default: "",
    },
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
