<template>
  <main class="container-auto-center">
    <div>{{ dict_poke }}</div>
    <div>{{ testpoke2 }}</div>
    <!-- <div>{{ testpoke3 }}</div> -->
    <!-- <div>{{ evolutions }}</div> -->
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
import axios from "axios";
import { ref } from "vue";
// import PokeAPI from "../services/PokeAPI";

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
    const testpoke = ref("");
    let dict_poke = [];
    for (let i = 1; i <= 2; i++) {
      // const testpoke2 = ref("");
      console.log(i);
      axios.get("https://pokeapi.co/api/v2/pokemon/" + i).then((response) => {
        testpoke.value = {
          id: response.data.id,
          name: response.data.forms[0].name,
          types: response.data.types,
          picture:
            response.data.sprites.other["official-artwork"].front_default,
          about_url: response.data.species.url,
        };
      });

      console.log(testpoke);
      dict_poke.push(testpoke);
    }
    console.log(dict_poke);
    const testpoke2 = ref("");
    axios
      .get("https://pokeapi.co/api/v2/pokemon-species/25/")
      .then((response) => {
        testpoke2.value = {
          about: response.data.flavor_text_entries[0].flavor_text,
          evolution_url: response.data.evolution_chain.url,
        };
      });
    // const testpoke3 = ref("");
    // axios
    //   .get("https://pokeapi.co/api/v2/evolution-chain/10/")
    //   .then((response) => {
    //     testpoke3.value = {
    //       evo: response,
    //     };
    //   });
    // console.log(testpoke3);

    return {
      testpoke,
      dict_poke,
      testpoke2,
      // testpoke3,
    };
  },
  computed: {
    ...mapState("pokemon", ["pokemons", "selectedPokemon"]),
  },
};
</script>

<style></style>
