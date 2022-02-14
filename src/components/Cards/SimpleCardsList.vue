<template>
  <div class="flex flex-wrap justify-center">
    <SimpleCard
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
import SimpleCard from "./SimpleCard.vue";
export default {
  components: { SimpleCard },
  //Composition API
  async setup() {
    // Artificial promise (PokéAPI will be used)
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 2000);
    });

    const result = await promise;

    return { result };
  },
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
