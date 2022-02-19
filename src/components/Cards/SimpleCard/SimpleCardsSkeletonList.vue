<template>
  <!-- List of SimpleCard components -->
  <div class="flex flex-wrap justify-center">
    <SimpleCardSkeleton
      v-for="n in 10"
      :key="n"
      :pokemon-name="pokemonName"
      :pokemon-num="pokemonNum"
      :pokemon-pict="pokemonPict"
      :pokemon-type-pict="pokemonTypePict"
    />
  </div>
</template>

<script>
import SimpleCardSkeleton from "./SimpleCardSkeleton.vue";
export default {
  components: { SimpleCardSkeleton },
};
</script>

<style></style>
