<template>
  <div class="sc-type-wrapper shadow-2xl" :class="colortype">
    <img
      class="w-6 h-6 mt-1 sm:w-6 sm:h-6 m-auto sm:mt-2"
      :src="getImg(pokemonColor)"
      :alt="pokemonColor"
    />
  </div>
</template>

<script>
export default {
  props: {
    pokemonColor: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      colortype: "bg-" + this.pokemonColor,
    };
  },
  methods: {
    getImg(pokemonColor) {
      return require("../../assets/images/types/" + pokemonColor + ".png");
    },
  },
};
</script>

<style></style>
