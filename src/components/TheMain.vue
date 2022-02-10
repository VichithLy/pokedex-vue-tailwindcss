<template>
  <main class="container mx-auto">
    This is the TheMain component. <br />

    <!-- Sort by name or ID -->

    <!-- List of SimpleCard components -->
    <div class="flex flex-wrap justify-center">
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
    <div class="flex flex-wrap justify-center">
      <DetailedCard
        :pokemon-about="pokemonAbout"
        :pokemon-stats="pokemonStats"
        :pokemon-evolution="pokemonEvolution"
        :pokemon-mensuration="pokemonMensuration"
        :pokemon-type-pict="pokemonTypePict"
        :pokemon-pict="pokemonPict"
        :pokemon-num="pokemonNum"
        :pokemon-name="pokemonName"
      />
    </div>
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
      pokemonAbout:
        "When several of these POKéMON gather, their electricity could build and cause lightning storms.",
      pokemonStats: {
        hp: 35,
        attack: 55,
        defense: 40,
        specialAttack: 50,
        specialDefense: 50,
        speed: 90,
      },
      pokemonEvolution: ["pikachu", "raichu"],
      pokemonMensuration: {
        height: {
          meter: "1m",
          feet: "3'3",
        },
        weight: {
          kg: "60.0 kg",
          lbs: "132.3 lbs",
        },
      },
    };
  },
};
</script>

<style></style>
