<template>
  <div v-if="error" class="error-modal">
    <div class="flex w-full justify-end">
      <CloseButton :color="'black'" @click="closeModal" />
    </div>
    <div class="w-1/2">
      <ErrorMessage :message="'Oh no! This Pokémon is hiding somewhere...'" />
    </div>
  </div>

  <div
    v-else
    class="dc-container drop-shadow-lg border-b-4 border-gray-400"
    :class="`bg-gradient-to-b back-from-${getTypes[0]} back-to-${getTypes[0]}`"
  >
    <div class="dc-header">
      <div class="dc-name">
        {{ getProfile.name }}
      </div>
      <CloseButton @click="closeModal" />
    </div>

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
import { computed, ref, toRefs } from "vue";
import { useStore } from "vuex";
import {
  SET_SELECTED_POKEMON,
  UPDATE_SHOW_MODAL,
} from "../../../store/mutation-action-types";
import CloseButton from "../../Modal/CloseButton.vue";
import { hideBodyOverflowY } from "../../../utils";
import ErrorMessage from "../../ErrorMessage.vue";

export default {
  components: {
    PokemonProfile,
    PokemonAbilities,
    PokemonAbout,
    PokemonBaseStats,
    PokemonEvolution,
    CloseButton,
    ErrorMessage,
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

    // Error handling
    const error = ref(null);

    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await dispatch("pokemon/" + SET_SELECTED_POKEMON, pokemonName.value);
    } catch (e) {
      error.value = e;
    }

    const selectedPokemon = computed(() => state.pokemon.selectedPokemon);

    // Method
    function closeModal() {
      dispatch("modal/" + UPDATE_SHOW_MODAL, false).then(
        hideBodyOverflowY(false),
      );
    }

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
      error,
      closeModal,
      getProfile,
      getAbilities,
      getTypes,
      getEvolutions,
      getAbout,
      getStats,
    };
  },
};
</script>

<style scoped>
.error-modal {
  @apply bg-white rounded-2xl flex flex-col justify-center items-center;
  @apply gap-4 p-5;
}
</style>
