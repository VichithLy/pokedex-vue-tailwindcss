<template>
  <!-- Detail Cards -->
  <div class="w-2/3 card-general flex flex-row border-yellow-500 border-2">
    <!-- Left Box -->
    <div class="w-1/4 card-general border-yellow-500 border-2">
      <div class="w-11/12 h-10 rounded-xl detail-bg-title"></div>
    </div>
    <!-- Right Box -->
    <div class="w-3/4 card-general flex flex-col border-yellow-500 border-2">
      <!-- About -->
      <div class="w-full h-1/6 border-yellow-500 border-2">
        <!-- About title -->
        <div>
          <div
            class="h-82 flex justify-center detail-bg-title rounded-3xl border-blue-50 border-2"
          >
            About
          </div>
          <!-- About text -->
          <p class="text-center mt-1 lg:sm:mt-4">{{ pokemonAbout }}</p>
        </div>
      </div>
      <!-- Base stats,Abilities -->
      <div class="w-full h-3/6 flex flex-row border-yellow-500 border-2">
        <!-- Base Stats -->
        <div class="w-1/2 h-full border-yellow-500 border-2">
          <div
            class="h-82 flex justify-center detail-bg-title rounded-3xl border-blue-50 border-2"
          >
            Base Stats
          </div>
          <div class="flex">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-9 w-9"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-9 w-9"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-9 w-9"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
                <path
                  d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-9 w-9"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="w-2/4">
              <div class="relative pt-1">
                <div
                  class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200"
                >
                  <div
                    style="width: 30%"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                  ></div>
                </div>
              </div>
              <div class="relative pt-1">
                <div
                  class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200"
                >
                  <div
                    style="width: 30%"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                  ></div>
                </div>
              </div>
              <div class="relative pt-1">
                <div
                  class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200"
                >
                  <div
                    style="width: 30%"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                  ></div>
                </div>
              </div>
              <div class="relative pt-1">
                <div
                  class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200"
                >
                  <div
                    style="width: 30%"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Abilities -->
        <div class="w-1/2 h-full border-yellow-500 border-2">
          <div
            class="h-82 flex justify-center detail-bg-title rounded-3xl border-blue-50 border-2"
          >
            Abilities
          </div>
          <div></div>
        </div>
      </div>
      <!-- Evolutions -->
      <div class="w-full h-2/6 border-yellow-500 border-2">
        <div
          class="h-82 flex justify-center detail-bg-title rounded-3xl border-blue-50 border-2"
        >
          Evolution
        </div>
        <div></div>
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
