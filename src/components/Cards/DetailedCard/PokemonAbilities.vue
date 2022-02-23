<template>
  <div class="dc-abilities-container bg-gray-50 bg-opacity-60">
    <div>
      <div
        class="dc-abilities-title-wrapper text-xl font-semibold md:font-bold lg:text-2xl bg-gray-500 bg-opacity-30"
      >
        Abilities
      </div>
      <!-- Abilities text -->
      <div class="dc-abilities-content-wrapper">
        <ul class="list-disc flex flex-col items-center gap-y-3">
          <li
            v-for="(ability, index) in abilities"
            :key="index"
            class="capitalize text-xl font-semibold"
          >
            {{ ability }}
          </li>
        </ul>
      </div>
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
