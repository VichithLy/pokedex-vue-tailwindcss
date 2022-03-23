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
import { computed, toRefs } from "vue";
import { useStore } from "vuex";
import { SET_SELECTED_POKEMON } from "../../../store/mutation-action-types";

export default {
  components: {
    PokemonProfile,
    PokemonAbilities,
    PokemonAbout,
    PokemonBaseStats,
    PokemonEvolution,
  },
  props: {
    pokemonName: {
      type: String,
      required: true,
      default: "",
    },
  },

  async setup(props) {
    // Props
    const { pokemonName } = toRefs(props);

    // Store
    const { state, dispatch } = useStore();

    //await new Promise((resolve) => setTimeout(resolve, 500));
    await dispatch("pokemon/" + SET_SELECTED_POKEMON, pokemonName.value);

    const selectedPokemon = computed(() => state.pokemon.selectedPokemon);

    // Computed
    const getTypes = computed(() => {
      return selectedPokemon.value.types.map((object) => object.type.name);
    });

    const getProfile = computed(() => {
      return {
        id: selectedPokemon.value.id,
        name: selectedPokemon.value.name,
        picture: selectedPokemon.value.picture || "",
        types: getTypes.value,
        height: selectedPokemon.value.height,
        weight: selectedPokemon.value.weight,
      };
    });

    const getAbout = computed(() => {
      return selectedPokemon.value.about;
    });

    const getStats = computed(() => {
      return {
        hp: selectedPokemon.value.stats[0].base_stat,
        attack: selectedPokemon.value.stats[1].base_stat,
        defense: selectedPokemon.value.stats[2].base_stat,
        specialAttack: selectedPokemon.value.stats[3].base_stat,
        specialDefense: selectedPokemon.value.stats[4].base_stat,
        speed: selectedPokemon.value.stats[5].base_stat,
      };
    });

    const getAbilities = computed(() => {
      return selectedPokemon.value.abilities.map(
        (object) => object.ability.name,
      );
    });

    const getEvolutions = computed(() => {
      return {
        currentPokemon: selectedPokemon.value.name,
        types: selectedPokemon.value.types,
        pokemons: selectedPokemon.value.evolutions,
      };
    });

    return {
      getProfile,
      getAbilities,
      getTypes,
      getEvolutions,
      getAbout,
      getStats,
    };
  },

  computed: {
    // getProfile() {
    //   return {
    //     id: this.pokemonObject.id,
    //     name: this.pokemonObject.name,
    //     picture: this.pokemonObject.picture || "",
    //     types: this.getTypes,
    //     height: this.pokemonObject.height,
    //     weight: this.pokemonObject.weight,
    //   };
    // },
    // getAbout() {
    //   return this.pokemonObject.about;
    // },
    // getStats() {
    //   return {
    //     hp: this.pokemonObject.stats[0].base_stat,
    //     attack: this.pokemonObject.stats[1].base_stat,
    //     defense: this.pokemonObject.stats[2].base_stat,
    //     specialAttack: this.pokemonObject.stats[3].base_stat,
    //     specialDefense: this.pokemonObject.stats[4].base_stat,
    //     speed: this.pokemonObject.stats[5].base_stat,
    //   };
    // },
    // getAbilities() {
    //   return this.pokemonObject.abilities.map((object) => object.ability.name);
    // },
    // getTypes() {
    //   return this.pokemonObject.types.map((object) => object.type.name);
    // },
    // getEvolutions() {
    //   return {
    //     currentPokemon: this.pokemonObject.name,
    //     types: this.pokemonObject.types,
    //     pokemons: this.pokemonObject.evolutions,
    //   };
    // },
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
