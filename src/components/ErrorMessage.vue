<template>
  <div class="w-full flex flex-col items-center gap-4">
    <img class="w-2/5" :src="pikaSurprised" alt="pika-surprised" />
    <div class="text-center font-bold text-xl">{{ message }}</div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import pikaSurprised from "../assets/images/pika_surprised.png";
import { UPDATE_IS_LOADING } from "../store/mutation-action-types";

export default {
  props: {
    message: {
      type: String,
      default: "",
    },
  },
  setup() {
    const { dispatch } = useStore();

    onMounted(() => {
      dispatch("pokemon/" + UPDATE_IS_LOADING);
    });

    return { pikaSurprised };
  },
};
</script>
