<template>
  <!-- bg-gradient-to-b back-from-detailed back-to-detailed  -->
  <div
    class="dc-container border-b-4 border-gray-400"
    :class="`bg-gradient-to-b back-from-${profile.types[0]} back-to-${profile.types[0]}`"
  >
    <PokemonProfile :profile="profile" />

    <PokemonAbout :about="about" />

    <PokemonBaseStats :base-stats="baseStats" />

    <PokemonAbilities :abilities="abilities" />

    <PokemonEvolution :evolutions="evolutions" />
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
  data() {
    return {
      profile: {
        id: this.pokemonObject.id,
        name: this.pokemonObject.name,
        picture: this.pokemonObject.picture,
        types: this.pokemonObject.types,
        height: this.pokemonObject.height,
        weight: this.pokemonObject.weight,
      },
      about: this.pokemonObject.about,
      baseStats: {
        hp: this.pokemonObject.base_stats.hp,
        attack: this.pokemonObject.base_stats.attack,
        defense: this.pokemonObject.base_stats.defense,
        specialAttack: this.pokemonObject.base_stats.specialAttack,
        specialDefense: this.pokemonObject.base_stats.specialDefense,
        speed: this.pokemonObject.base_stats.speed,
      },
      abilities: this.pokemonObject.abilities,
      evolutions: this.pokemonObject.evolutions,
    };
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
