<template>
  <div
    class="dc-container drop-shadow-lg border-b-4 border-gray-400"
    :class="`bg-gradient-to-b back-from-${getTypes[0]} back-to-${getTypes[0]}`"
  >
    <PokemonProfile :profile="getProfile" />

    <PokemonAbout :about="getAbout" />

    <PokemonBaseStats :base-stats="getStats" />

    <PokemonAbilities :abilities="getAbilities" />

    <PokemonEvolution :evolutions="getEvolutions" />
  </div>
</template>

<script>
import PokemonProfile from "./PokemonProfile.vue";
import PokemonAbout from "./PokemonAbout.vue";
import PokemonAbilities from "./PokemonAbilities.vue";
import PokemonBaseStats from "./PokemonBaseStats.vue";
import PokemonEvolution from "./PokemonEvolution.vue";

export default {
  components: {
    PokemonProfile,
    PokemonAbilities,
    PokemonAbout,
    PokemonBaseStats,
    PokemonEvolution,
  },
  props: {
    pokemonObject: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    getProfile() {
      return {
        id: this.pokemonObject.id,
        name: this.pokemonObject.name,
        picture: this.pokemonObject.picture || "",
        types: this.getTypes,
        height: this.pokemonObject.height,
        weight: this.pokemonObject.weight,
      };
    },
    getAbout() {
      return this.pokemonObject.about;
    },
    getStats() {
      return {
        hp: this.pokemonObject.stats[0].base_stat,
        attack: this.pokemonObject.stats[1].base_stat,
        defense: this.pokemonObject.stats[2].base_stat,
        specialAttack: this.pokemonObject.stats[3].base_stat,
        specialDefense: this.pokemonObject.stats[4].base_stat,
        speed: this.pokemonObject.stats[5].base_stat,
      };
    },
    getAbilities() {
      return this.pokemonObject.abilities.map((object) => object.ability.name);
    },
    getTypes() {
      return this.pokemonObject.types.map((object) => object.type.name);
    },
    getEvolutions() {
      return {
        currentPokemon: this.pokemonObject.name,
        types: this.pokemonObject.types,
        pokemons: this.pokemonObject.evolutions,
      };
    },
  },
};
</script>

<style>
.card-general {
  height: 600px;
  background-color: #f8d326;
}
.detail-bg-title {
  background-color: #fff9c9;
}
</style>
