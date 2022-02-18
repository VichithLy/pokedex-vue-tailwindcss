<template>
  <div
    class="sc-container hover:scale-105 ease-in-out duration-300 cursor-pointer"
    :class="getArrayType(pokemon)"
    @mouseover="updateIsOverCard(true)"
    @mouseleave="updateIsOverCard(false)"
  >
    <!-- Number and Type container -->
    <div class="sc-number-type-container">
      <PokemonNumber> #{{ pokemon.id }} </PokemonNumber>

      <PokemonType
        v-for="(type, index) in pokemon.types"
        :key="index"
        :pokemon-color="type.type.name"
      />
    </div>

    <PokemonPicture :pokemon-pict="pokemon.picture" />

    <PokemonName>{{ pokemon.name }}</PokemonName>
  </div>
</template>

<script>
import PokemonName from "./PokemonName.vue";
import PokemonNumber from "./PokemonNumber.vue";
import PokemonPicture from "./PokemonPicture.vue";
import PokemonType from "./PokemonType.vue";

export default {
  components: { PokemonType, PokemonNumber, PokemonPicture, PokemonName },
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    // pokemonNum: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    // pokemonPict: {
    //   type: String,
    //   required: true,
    //   default: "",
    // },
    // pokemonType: {
    //   type: Object,
    //   required: true,
    // },
  },
  methods: {
    updateIsOverCard(value) {
      this.$store.commit("cursor/UPDATE_IS_OVER_CARD", value);
    },
    getArrayType(pokemon) {
      console.log(pokemon.types);
      let listtype = [];
      for (let i = 0; i < Object.keys(pokemon.types).length; i++) {
        listtype.push(pokemon.types[i]["type"]["name"]);
      }
      if (listtype.length == 2) {
        console.log(listtype);
        console.log(
          "bg-gradient-to-b from-" + listtype[0] + "  to-" + listtype[1]
        );
        console.log("il y a 2 types");
        return "bg-gradient-to-b from-" + listtype[0] + " to-" + listtype[1];
        // return "bg-poison";
      } else {
        console.log("il y a 1 type");
        return "bg-" + listtype[0];
      }
    },
  },
};
</script>

<style scoped></style>
