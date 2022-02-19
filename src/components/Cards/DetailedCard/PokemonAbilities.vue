<template>
  <div class="h-52 p-3 rounded-2xl bg-gray-50 bg-opacity-60">
    <div>
      <div
        class="h-82 flex justify-center rounded-3xl text-xl font-semibold md:font-bold lg:text-2xl bg-gray-500 bg-opacity-30"
      >
        Abilities
      </div>
      <!-- Abilities text -->
      <div class="mt-1 lg:sm:mt-4">
        <ul class="list-disc flex flex-col items-center mt-2 gap-y-3">
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
