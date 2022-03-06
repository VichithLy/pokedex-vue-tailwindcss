<template>
  <main class="container-auto-center">
    <!-- <div v-for="(pokemon, index) in pokemons2" :key="index">
      {{ pokemon.name }}
      <br />
    </div> -->

    <!-- Sort by name or ID -->
    <SortByIdOrName />

    <!-- For async component -->
    <Suspense>
      <template #default>
        <SimpleCardsList :pokemons-array="pokemons2" />
      </template>

      <template #fallback>
        <SimpleCardsSkeletonList />
      </template>
    </Suspense>

    <!-- ! TO UNCOMMENT -->

    <!-- <div class="flex flex-col justify-center gap-y-12 mt-10">
      <DetailedCardSkeleton class="mt-10" />

      <DetailedCard
        v-for="(pokemon, index) in pokemons"
        :key="index"
        :pokemon-object="pokemon"
      />
    </div> -->

    <!-- ! TO UNCOMMENT -->

    <!-- <ModalDialog v-if="selectedPokemon">
      <DetailedCard :pokemon-object="selectedPokemon" />
    </ModalDialog> -->

    <ScrollButton />
  </main>
</template>

<script>
import SimpleCardsList from "./Cards/SimpleCard/SimpleCardsList.vue";
import SimpleCardsSkeletonList from "./Cards/SimpleCard/SimpleCardsSkeletonList.vue";
//import DetailedCard from "./Cards/DetailedCard/DetailedCard.vue";
import SortByIdOrName from "./SortByIdOrName.vue";
import ScrollButton from "./ScrollButton.vue";
//import DetailedCardSkeleton from "./Cards/DetailedCard/DetailedCardSkeleton.vue";
import { mapActions, mapState } from "vuex";
import { GET_POKEMONS } from "../store/mutation-types";
//import ModalDialog from "./Modal/ModalDialog.vue";

export default {
  name: "TheMain",
  components: {
    //DetailedCard,
    SimpleCardsList,
    SimpleCardsSkeletonList,
    SortByIdOrName,
    ScrollButton,
    //DetailedCardSkeleton,
    //ModalDialog,
  },
  data() {
    return {
      results: [],
    };
  },
  computed: {
    // ! REPLACE POKEMONS BY POKEMONS2
    ...mapState("pokemon", ["pokemons", "selectedPokemon", "pokemons2"]),
  },
  mounted() {
    this.GET_POKEMONS();
  },
  methods: {
    ...mapActions("pokemon", [GET_POKEMONS]),
  },
};
</script>

<style></style>
