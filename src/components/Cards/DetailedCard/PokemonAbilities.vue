<template>
  <div class="dc-abilities-container bg-gray-50 bg-opacity-60">
    <div class="dc-abilities-title-wrapper bg-gray-500 bg-opacity-30">
      Abilities
    </div>
    <!-- Abilities text -->
    <div class="dc-abilities-content-wrapper">
      <ul class="dc-abilities-ul">
        <li v-for="(ability, index) in abilities" :key="index">
          {{ ability }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    abilities: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style></style>
