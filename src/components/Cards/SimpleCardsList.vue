<template>
  <div class="flex flex-wrap justify-center">
    <SimpleCard v-for="n in 10" :key="n" :pokemon="pokemon" />
  </div>
</template>

<script>
import SimpleCard from "./SimpleCard.vue";
import PokemonJson from "../../../src/constants/pokemon_request.json";
export default {
  components: { SimpleCard },
  //Composition API
  async setup() {
    // Artificial promise (PokéAPI will be used)
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 200);
    });

    const result = await promise;

    return { result };
  },
  data() {
    return {
      pokemon: {
        name:
          PokemonJson.forms[0].name.charAt(0).toUpperCase() +
          PokemonJson.forms[0].name.slice(1),
        id: PokemonJson.id,
        picture: PokemonJson.sprites.other["official-artwork"].front_default,
        types: PokemonJson.types,
      },
      // name:
      //   PokemonJson.forms[0].name.charAt(0).toUpperCase() +
      //   PokemonJson.forms[0].name.slice(1),
      // id: PokemonJson.id,
      // picture: PokemonJson.sprites.other["official-artwork"].front_default,
      // types: PokemonJson.types,
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
