<template>
  <!-- Card -->

  <div
    class="rounded-2xl hover:scale-105 ease-in-out duration-300 bg-yellow-600 cursor-pointer relative h-64 w-40 mx-2 my-2 sm:mx-4 sm:my-4 sm:h-80 sm:w-60"
  >
    <!-- Number and Type container -->
    <div
      class="flex items-center flex-row justify-between py-2"
      name="card-header"
    >
      <!-- Number -->
      <div
        class="flex items-center justify-items-center text-base font-extrabold style-num ml-1 my-2 mx-4 text-xl sm:ml-4 sm:my-1 sm:mx-4 sm:text-4xl"
      >
        #{{ pokemonNum }}
      </div>

      <!-- Type -->
      <div
        class="shadow-2xl w-8 h-8 sm:w-10 sm:h-10 bg-green-400 rounded-full mr-4"
      >
        <img
          class="w-6 h-6 mt-1 sm:w-6 sm:h-6 m-auto sm:mt-2"
          :src="'https://images.gameinfo.io/pokemon-trimmed/60/p1.webp'"
          :alt="pokemonTypePict.alt"
          srcset=""
        />
      </div>
    </div>
    <!-- Pokémon Pic -->
    <div name="card-image">
      <img
        class="w-36 h-36 sm:w-48 sm:h-48 mx-auto"
        :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png'"
        :alt="pokemonPict.alt"
        srcset=""
      />
    </div>
    <!-- Name -->
    <div name="card-title ">
      <div
        class="style-name text-center text-xl sm:text-2xl absolute bottom-0 left-1/2 -translate-x-1/2 mb-4"
      >
        {{ pokemonName }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SimpleCard",
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
    pokemonNum: {
      type: Number,
      required: true,
    },
    pokemonPict: {
      type: String,
      required: true,
    },
    pokemonTypePict: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Teko:wght@400;700&family=Ubuntu:wght@500&display=swap");
.style-name {
  font-family: "Press Start 2P", cursive;
}
.style-num {
  font-family: "Ubuntu", sans-serif;
}
</style>
