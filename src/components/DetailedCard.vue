<template>
  <!-- Detail Cards -->
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <!-- Left Card -->
    <div class="bg-red-300 p-3 row-span-2 md:row-span-3 rounded">
      <div
        class="flex justify-center text-xl md:text-2xl lg:text-3xl md:font-semibold"
      >
        #44
      </div>
      <div
        class="flex justify-center text-2xl md:text-3xl lg:text-4xl md:font-semibold"
      >
        PIka
      </div>

      <div>Image</div>
    </div>
    <!-- About text -->
    <div class="bg-red-300 p-3 md:col-span-1 rounded">
      <div>
        <div
          class="h-82 flex justify-center detail-bg-title rounded-3xl text-xl font-semibold md:font-bold lg:text-2xl"
        >
          About
        </div>

        <!-- About text -->
        <p class="text-center mt-1 lg:sm:mt-4">Le about</p>
      </div>
    </div>

    <!-- Base stats graph-->
    <div class="bg-red-300 p-3 md:row-span-2 rounded">
      <div>
        <div
          class="h-82 flex justify-center detail-bg-title rounded-3xl text-xl font-semibold md:font-bold lg:text-2xl"
        >
          Base stats
        </div>
        <!-- Base stats graph-->
      </div>
      <div class="flex items-center p-2">
        <img :src="heartIcon" class="w-9 icon-heart" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-200 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: '25%',
              }"
            >
              STAT
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center p-2">
        <img :src="heartIcon" class="w-9 icon-heart" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-200 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: '25%',
              }"
            >
              STAT
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center p-2">
        <img :src="heartIcon" class="w-9 icon-heart" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-200 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: '25%',
              }"
            >
              STAT
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center p-2">
        <img :src="heartIcon" class="w-9 icon-heart" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-200 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: '25%',
              }"
            >
              STAT
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center p-2">
        <img :src="heartIcon" class="w-9 icon-heart" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-200 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: '25%',
              }"
            >
              STAT
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Abilities text -->
    <div class="bg-red-300 h-52 p-3 rounded">
      <div>
        <div
          class="h-82 flex justify-center detail-bg-title rounded-3xl text-xl font-bold font-semibold lg:text-2xl"
        >
          Abilities
        </div>
        <!-- Abilities text -->
        <div class="mt-1 lg:sm:mt-4"></div>
      </div>
    </div>
    <!-- Evolutions -->
    <div class="bg-red-300 p-3 md:col-span-2 rounded">
      <div>
        <div
          class="h-82 flex justify-center detail-bg-title rounded-3xl text-xl font-bold font-semibold lg:text-2xl"
        >
          Evolutions
        </div>
        <!-- Evolutions -->
        <div class="sm:m-5 flex flex-row justify-around">
          <div
            class="shadow-2xl w-20 h-20 <!-- sm:w-24 sm:h-24 --> bg-green-400 rounded-full mr-4"
          >
            <img
              class="w-6 h-6 mt-1 sm:w-20 sm:h-20 m-auto sm:mt-2"
              :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg'"
              :alt="pokemonTypePictAlt"
            />
          </div>
          <div
            class="shadow-2xl w-20 h-20 <!-- sm:w-24 sm:h-24 --> bg-green-400 rounded-full mr-4"
          >
            <img
              class="w-6 h-6 mt-1 sm:w-20 sm:h-20 m-auto sm:mt-2"
              :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg'"
              :alt="pokemonTypePictAlt"
            />
          </div>
          <div
            class="shadow-2xl w-20 h-20 <!-- sm:w-24 sm:h-24 --> bg-green-400 rounded-full mr-4"
          >
            <img
              class="w-6 h-6 mt-1 sm:w-20 sm:h-20 m-auto sm:mt-2"
              :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg'"
              :alt="pokemonTypePictAlt"
            />
          </div>
        </div>
        <p class="text-center mt-1 lg:sm:mt-4"></p>
      </div>
    </div>
  </div>
  <br />
</template>
<script>
export default {
  name: "DetailedCard",
  props: {
    pokemonAbout: {
      type: String,
      required: true,
    },
    pokemonStats: {
      type: Object,
      required: true,
    },
    pokemonEvolution: {
      type: Array,
      required: false,
      default: () => [],
    },
    pokemonMensuration: {
      type: Object,
      required: true,
    },
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

<style>
.card-general {
  height: 600px;
  background-color: #f8d326;
}
.detail-bg-title {
  background-color: #fff9c9;
}
</style>
