<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="close-btn"
    viewBox="0 1 18 18"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clip-rule="evenodd"
    />
  </svg>
</template>

<script>
export default {};
</script>

<style scoped>
.close-btn {
  @apply w-12 text-gray-50 text-opacity-60 cursor-pointer;
  @apply hover:text-opacity-100 ease-linear duration-100;
}
</style>
