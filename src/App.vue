<template>
  <router-view />
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap");

* {
  font-family: "Nunito", sans-serif;
}

body {
  /* When cursor is out the page */
  overflow-x: hidden;
}

.hide-overflow-y {
  /* When modal is open */
  overflow-y: hidden;
}
</style>
