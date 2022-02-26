<template>
  <main class="container-auto-center">
    <!-- Sort by name or ID -->
    <SortByIdOrName />

    <!-- For async component -->
    <Suspense>
      <template #default>
        <SimpleCardsList :pokemons-array="pokemons" />
      </template>

      <template #fallback>
        <SimpleCardsSkeletonList />
      </template>
    </Suspense>
    <div class="flex flex-col justify-center gap-y-12 mt-10">
      <DetailedCardSkeleton class="mt-10" />

      <DetailedCard
        v-for="(pokemon, index) in pokemons"
        :key="index"
        :pokemon-object="pokemon"
      />
    </div>

    <ModalDialog v-if="selectedPokemon">
      <DetailedCard :pokemon-object="selectedPokemon" />
    </ModalDialog>

    <ScrollButton />
  </main>
</template>

<script>
import SimpleCardsList from "./Cards/SimpleCard/SimpleCardsList.vue";
import SimpleCardsSkeletonList from "./Cards/SimpleCard/SimpleCardsSkeletonList.vue";
import DetailedCard from "./Cards/DetailedCard/DetailedCard.vue";
import SortByIdOrName from "./SortByIdOrName.vue";
import ScrollButton from "./ScrollButton.vue";
import DetailedCardSkeleton from "./Cards/DetailedCard/DetailedCardSkeleton.vue";
import { mapState } from "vuex";
import ModalDialog from "./Modal/ModalDialog.vue";

export default {
  name: "TheMain",
  components: {
    DetailedCard,
    SimpleCardsList,
    SimpleCardsSkeletonList,
    SortByIdOrName,
    ScrollButton,
    DetailedCardSkeleton,
    ModalDialog,
  },
  computed: {
    ...mapState("pokemon", ["pokemons", "selectedPokemon"]),
  },
};
</script>

<style></style>
