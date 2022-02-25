<template>
  <main class="container-auto-center">
    <!-- Sort by name or ID -->
    <SortByIdOrName />

    <!-- For async component -->
    <Suspense>
      <template #default>
        <SimpleCardsList
          :pokemons-array="PokemonsArray"
          @click="showModal = !showModal"
        />
      </template>

      <template #fallback>
        <SimpleCardsSkeletonList />
      </template>
    </Suspense>
    <ModalDialog :show="showModal" />
    <div class="flex flex-col justify-center gap-y-12 mt-10">
      <DetailedCardSkeleton class="mt-10" />

      <DetailedCard
        v-for="(pokemon, index) in PokemonsArray"
        :key="index"
        :pokemon-object="pokemon"
      />
    </div>

    <ScrollButton />
  </main>
</template>

<script>
import SimpleCardsList from "./Cards/SimpleCard/SimpleCardsList.vue";
import SimpleCardsSkeletonList from "./Cards/SimpleCard/SimpleCardsSkeletonList.vue";
import DetailedCard from "./Cards/DetailedCard/DetailedCard.vue";
import SortByIdOrName from "./SortByIdOrName.vue";
import PokemonsArray from "@/constants/pokemons_array.json";
import ScrollButton from "./ScrollButton.vue";
import DetailedCardSkeleton from "./Cards/DetailedCard/DetailedCardSkeleton.vue";
import ModalDialog from "../components/ModalDialog.vue";
import { ref } from "vue";

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
  setup() {
    const showModal = ref(false);
    const closeModal = ref(true);

    return {
      showModal,
      closeModal,
    };
  },
  data() {
    return {
      PokemonsArray,
    };
  },
};
</script>

<style></style>
