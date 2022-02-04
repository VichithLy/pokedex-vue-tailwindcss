<template>
  <div class="home container mx-auto">
    <TheHeader />

    <TheMain />

    <SimpleCard
      :pokemon-name="pokemonName"
      :pokemon-num="pokemonNum"
      :pokemon-pict="pokemonPict"
      :pokemon-type-pict="pokemonTypePict"
    />

    <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from "../components/TheHeader.vue";
import TheMain from "../components/TheMain.vue";
import TheFooter from "../components/TheFooter.vue";
import SimpleCard from "../components/SimpleCard.vue";

export default {
  name: "Home",
  components: {
    TheFooter,
    TheHeader,
    TheMain,
    SimpleCard,
  },
  data() {
    return {
      pokemonName: "Pikachu",
      pokemonNum: 200,
      pokemonPict: {
        source: "../assets/images/pika.png",
        alt: "Un pokemon",
      },
      pokemonTypePict: {
        source: "images/electric.png",
        alt: "Un type de pokemon",
      },
    };
  },
};
</script>
