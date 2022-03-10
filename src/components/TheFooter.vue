<template>
  <footer class="mt-10 py-5 flex flex-col gap-2 font-bold">
    <!-- Site description -->
    <div class="flex justify-center flex-wrap gap-y-2">
      <div class="flex whitespace-nowrap">
        Built with
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-pokemon-red-500 mx-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          />
        </svg>
        using
      </div>

      <div class="flex whitespace-nowrap">
        <a href="https://pokeapi.co/" target="_blank" class="link ml-1"
          >PokéAPI</a
        >,
        <a href="https://vuejs.org/" target="_blank" class="link mx-1"
          >Vue.js</a
        >
        and
        <a href="https://tailwindcss.com/" target="_blank" class="link ml-1"
          >Tailwind CSS</a
        >
      </div>
    </div>
    <!-- GitHub link -->
    <div class="flex justify-center items-center gap-x-10">
      <a
        href="https://github.com/VichithLy/pokedex-vue-tailwindcss"
        target="_blank"
      >
        <img src="https://github.githubassets.com/favicons/favicon.png" />
      </a>
      <!-- Legal Mentions page -->
      <p class="hover:text-pokemon-red-500">
        <router-link to="/legal-mentions">Legal Mentions</router-link>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped></style>
