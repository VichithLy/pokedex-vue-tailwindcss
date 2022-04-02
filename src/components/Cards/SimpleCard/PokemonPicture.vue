<template>
  <img v-if="pokemonPict" class="sc-picture-wrapper" :src="pokemonPict" />
  <ErrorMessage v-else :message="'No image found!'" />
</template>

<script>
import ErrorMessage from "../../ErrorMessage.vue";
export default {
  components: { ErrorMessage },
  props: {
    pokemonPict: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style></style>
