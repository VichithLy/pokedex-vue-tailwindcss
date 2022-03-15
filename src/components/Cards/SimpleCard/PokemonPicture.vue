<template>
  <img v-if="pokemonPict" class="sc-picture-wrapper" :src="pokemonPict" />
  <div v-else>NO IMAGE</div>
</template>

<script>
export default {
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
