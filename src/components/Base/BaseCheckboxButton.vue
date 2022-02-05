<template>
  <div class="relative">
    <input
      :id="'toggle-' + inputValue"
      v-model="model"
      type="checkbox"
      :value="inputValue"
      class="absolute peer w-full h-full left-0 right-0 appearance-none"
    />

    <label
      :for="'toggle-' + inputValue"
      class="
        flex
        relative
        rounded-full
        border-2 border-red-400
        text-red-400
        font-bold
        peer-checked:bg-red-400 peer-checked:text-white
        cursor-pointer
        z-10
        ease-in-out
        duration-300
        hover:scale-105
        select-none
        capitalize
        place-content-center
        py-0.5
        w-24
        sm:w-26
        md:w-36
        lg:w-40
      "
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

<style>
</style>