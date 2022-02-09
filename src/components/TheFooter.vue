<template>
  <footer>
    <div class="mt-3 h-16">
      <!-- ----- Site description -->
      <p class="flex justify-center">
        Built with love using PokéAPI, Vue.js and Tailwind CSS
      </p>
      <!-- ----- GitHub link -->
      <div class="flex justify-center items-center">
        <a href="https://github.com/VichithLy/pokedex-vue-tailwindcss"
          ><img
            class="mr-5"
            src="https://github.githubassets.com/favicons/favicon.png"
        /></a>
        <!-- ----- Legal Mentions page link -->
        <p><a href="#">Legal Mentions</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap");

* {
  font-family: "Nunito", sans-serif;
}
</style>
