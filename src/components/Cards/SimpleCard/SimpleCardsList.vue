<template>
  <div class="flex flex-wrap justify-center gap-5">
    <SimpleCard
      v-for="(pokemon, index) in pokemonsArray"
      :key="index"
      :pokemon-object="pokemon"
    />
  </div>
</template>

<script>
import SimpleCard from "./SimpleCard.vue";

export default {
  components: { SimpleCard },
  props: {
    pokemonsArray: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  //Composition API
  async setup() {
    // Artificial promise (PokéAPI will be used)
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 200);
    });

    const result = await promise;

    return { result };
  },
};
</script>
