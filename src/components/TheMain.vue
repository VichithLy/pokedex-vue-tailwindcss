<template>
  <main class="container-auto-center">
    <!-- Sort by name or ID -->
    <div class="flex flex-wrap gap-y-4 flex-row justify-between w-5/6 my-8">
      <SortingDetails />
      <SortByIdOrName />
    </div>
    <!-- For async component -->
    <Transition name="fade">
      <KeepAlive>
        <Suspense>
          <template #default>
            <SimpleCardsList />
          </template>

          <template #fallback>
            <SimpleCardsSkeletonList />
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>

    <ModalDialog v-if="showModal && selectedPokemonName">
      <KeepAlive>
        <Suspense>
          <template #default>
            <DetailedCard
              class="relative"
              :pokemon-name="selectedPokemonName"
            />
          </template>

          <template #fallback>
            <DetailedCardSkeleton />
          </template>
        </Suspense>
      </KeepAlive>
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
import SortingDetails from "./SortingDetails.vue";

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
    SortingDetails,
  },
  // Catch errors from the children components
  // setup() {
  //   const error = ref(null);

  //   onErrorCaptured((e) => {
  //     error.value = e;
  //   });

  //   return { error };
  // },
  computed: {
    ...mapState("pokemon", ["pokemons", "selectedPokemonName"]),
    ...mapState("modal", ["showModal"]),
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
