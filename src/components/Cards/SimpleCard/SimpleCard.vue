<template>
  <div
    class="sc-container hover:scale-105 ease-in-out duration-100 cursor-pointer border-b-4 border-gray-400 drop-shadow-lg select-none"
    :class="gradientBackground"
    @mouseover="UPDATE_IS_OVER_CARD(true)"
    @mouseleave="UPDATE_IS_OVER_CARD(false)"
    @click="handleOnCardClick"
  >
    <!-- Number and Type container -->
    <div class="sc-number-type-container">
      <PokemonNumber> #{{ id }} </PokemonNumber>

      <div class="sc-types-container">
        <PokemonType
          v-for="(type, index) in types"
          :key="index"
          :type-color="type"
        />
      </div>
    </div>

    <PokemonPicture :pokemon-pict="picture" />

    <PokemonName>{{ name }}</PokemonName>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PokemonName from "./PokemonName.vue";
import PokemonNumber from "./PokemonNumber.vue";
import PokemonPicture from "./PokemonPicture.vue";
import PokemonType from "./PokemonType.vue";
import {
  UPDATE_SELECTED_POKEMON,
  UPDATE_SHOW_MODAL,
  UPDATE_IS_OVER_CARD,
} from "../../../store/mutation-types";

import { hideBodyOverflowY, getRecursiveEvolution } from "@/utils";
import { getPokemonByName, getInfoByUrl } from "@/services/PokeAPI";

export default {
  components: {
    PokemonType,
    PokemonNumber,
    PokemonPicture,
    PokemonName,
  },
  props: {
    pokemonObject: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      id: this.pokemonObject.id,
      name: this.pokemonObject.name,
      about: this.pokemonObject.about,
      picture: this.pokemonObject.picture,
      types: this.pokemonObject.types,
    };
  },
  computed: {
    ...mapState("modal", ["showModal"]),
    // This function returns the bg class to apply on the cards if there are one or two types
    gradientBackground: function () {
      if (this.types.length == 2) {
        return `bg-gradient-to-b back-from-${this.types[0]} back-to-${this.types[1]}`;
      }
      return `back-color-${this.types[0]}-dark`;
    },
  },
  mounted() {
    console.log(this.setDetailedPokemon("butterfree"));
  },
  methods: {
    ...mapActions("cursor", [UPDATE_IS_OVER_CARD]),
    ...mapActions("pokemon", [UPDATE_SELECTED_POKEMON]),
    ...mapActions("modal", [UPDATE_SHOW_MODAL]),

    handleOnCardClick() {
      this.UPDATE_SELECTED_POKEMON(this.pokemonObject).then(() => {
        this.UPDATE_SHOW_MODAL(!this.showModal);
        hideBodyOverflowY(true);
      });
    },

    setDetailedPokemon(name) {
      getPokemonByName(name).then((response) => {
        const pokemon = response.data;
        const species_url = pokemon.species.url;
        // Get the species
        getInfoByUrl(species_url).then((response) => {
          const species = response.data;

          // About
          const about = species.flavor_text_entries[0].flavor_text;

          // Evolution
          const evolution_chain_url = species.evolution_chain.url;
          console.log(evolution_chain_url);

          // Get the evolution chain
          getInfoByUrl(evolution_chain_url).then((response) => {
            const evolution_chain = response.data.chain;
            let evolution_chain_array = [];
            getRecursiveEvolution(evolution_chain, evolution_chain_array);
            // Create the Pokemon object used in the DetailedCard component
            const pokemonObject = {
              id: pokemon.id,
              name: pokemon.name,
              about: about,
              types: pokemon.types.map((object) => object.type.name),
              picture: pokemon.sprites.other["official-artwork"].front_default,
              weight: {
                kg: pokemon.weight / 10,
                lbs: ((pokemon.weight / 10) * 2.205).toFixed(1),
              },
              height: {
                m: pokemon.height / 10,
                ft: ((pokemon.height / 10) * 3.281).toFixed(1),
              },
              base_stats: {
                hp: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                specialAttack: pokemon.stats[3].base_stat,
                specialDefense: pokemon.stats[4].base_stat,
                speed: pokemon.stats[5].base_stat,
              },
              abilities: pokemon.abilities.map((object) => object.ability.name),
              evolutions: evolution_chain_array,
            };
            console.log(pokemonObject);

            this.UPDATE_SELECTED_POKEMON(pokemonObject).then(() => {
              this.UPDATE_SHOW_MODAL(!this.showModal);
              hideBodyOverflowY(true);
            });
          });
        });
      });
    },
  },
};
</script>

<style scoped></style>
