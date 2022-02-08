<template>
  <div class="relative w-full">
    <input
      :id="'toggle-' + inputValue"
      v-model="model"
      type="checkbox"
      :value="inputValue"
      class="absolute peer w-full h-full left-0 right-0 appearance-none"
    />

    <!-- The label looks like a button -->
    <label
      :for="'toggle-' + inputValue"
      :class="[
        'flex',
        'relative',
        'rounded-full',
        'border-4',
        ' cursor-pointer',
        'z-10',
        'ease-in-out',
        'duration-100',
        'hover:scale-105',
        'select-none',
        'capitalize',
        'place-content-center',
        'py-0.5',
        ' items-start',
        'font-medium',
        'shadow-xl',
        'btn-type-' + inputValue,
      ]"
    >
      {{ inputValue }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
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

<style scoped></style>
