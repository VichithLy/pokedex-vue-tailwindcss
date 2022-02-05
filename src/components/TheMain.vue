<template>
  <main class="container mx-auto">
    This is the TheMain component. <br />

    <!-- Sort by name or ID -->

    <!-- List of SimpleCard components -->
    <div class="flex flex-wrap justify-center bg-red-900">
      <SimpleCard
        :pokemon-name="pokemonName"
        :pokemon-num="pokemonNum"
        :pokemon-pict="pokemonPict"
        :pokemon-type-pict="pokemonTypePict"
      />
      <SimpleCard
        :pokemon-name="pokemonName"
        :pokemon-num="pokemonNum"
        :pokemon-pict="pokemonPict"
        :pokemon-type-pict="pokemonTypePict"
      />
    </div>
    <DetailedCard />
  </main>
</template>

<script>
import SimpleCard from "./SimpleCard.vue";
import DetailedCard from "./DetailedCard.vue";

export default {
  name: "TheMain",
  components: { SimpleCard, DetailedCard },
  data() {
    return {
      pokemonName: "Pikachu",
      pokemonNum: 200,
      pokemonPict: {
        source: "../assets/images/pika.png",
        alt: "Un pokemon",
      },
      pokemonTypePict: {
        source: "images/electric.png",
        alt: "Un type de pokemon",
      },
    };
  },
};
</script>

<style></style>
