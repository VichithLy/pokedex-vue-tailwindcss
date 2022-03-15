<template>
  <div>
    <TheCursor />

    <TheHeader />

    <TheMain />

    <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from "../components/Header/TheHeader.vue";
import TheMain from "../components/TheMain.vue";
import TheFooter from "../components/TheFooter.vue";
import TheCursor from "../components/TheCursor.vue";
import { GET_POKEMONS, SET_ALL_POKEMONS } from "../store/mutation-types";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    TheFooter,
    TheHeader,
    TheMain,
    TheCursor,
  },
  mounted() {
    // get all the pokemons from the api,
    // then display the first 20
    this.SET_ALL_POKEMONS().then(() => {
      this.GET_POKEMONS();
    });
  },
  methods: {
    ...mapActions("pokemon", [SET_ALL_POKEMONS, GET_POKEMONS]),
  },
};
</script>
