<template>
  <main class="container-auto-center">
    <!-- Sort by name or ID -->
    <SortByIdOrName />

    <!-- For async component -->
    <Suspense>
      <template #default>
        <SimpleCardsList :pokemons-array="PokemonsArray" />
      </template>

      <template #fallback>
        <SimpleCardsSkeletonList />
      </template>
    </Suspense>

    <div class="flex flex-wrap justify-center">
      <DetailedCard
        :pokemon-about="pokemonAbout"
        :pokemon-stats="pokemonStats"
        :pokemon-evolution="pokemonEvolution"
        :pokemon-mensuration="pokemonMensuration"
        :pokemon-type-pict="pokemonTypePict"
        :pokemon-pict="pokemonPict"
        :pokemon-num="pokemonNum"
        :pokemon-name="pokemonName"
      />
    </div>
  </main>
</template>

<script>
import SimpleCardsList from "./Cards/SimpleCardsList.vue";
import SimpleCardsSkeletonList from "./Cards/SimpleCardsSkeletonList.vue";
import DetailedCard from "./DetailedCard.vue";
import SortByIdOrName from "./SortByIdOrName.vue";
import PokemonsArray from "@/constants/pokemons_array.json";

export default {
  name: "TheMain",
  components: {
    DetailedCard,
    SimpleCardsList,
    SimpleCardsSkeletonList,
    SortByIdOrName,
  },

  data() {
    return {
      PokemonsArray,
    };
  },
};
</script>

<style></style>
