<template>
  <main class="container-auto-center">
    <!-- Sort by name or ID -->
    <SortByIdOrName />

    <!-- For async component -->
    <Suspense>
      <template #default>
        <SimpleCardsList />
      </template>

      <template #fallback>
        <SimpleCardsSkeletonList />
      </template>
    </Suspense>

    <ModalDialog v-if="selectedPokemon && showModal">
      <DetailedCard class="relative" :pokemon-object="selectedPokemon" />
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
//import DetailedCardSkeleton from "./Cards/DetailedCard/DetailedCardSkeleton.vue";
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
    //DetailedCardSkeleton,
    ModalDialog,
  },

  computed: {
    ...mapState("pokemon", ["pokemons", "selectedPokemon"]),
    ...mapState("modal", ["showModal"]),
  },
};
</script>

<style></style>
