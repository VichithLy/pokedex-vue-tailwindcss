<template>
  <div
    class="row-span-2 md:row-span-3 rounded-2xl flex flex-col justify-between py-10 items-center bg-gray-50 bg-opacity-60"
  >
    <!-- Pokemon ID -->
    <div
      class="flex justify-center text-xl md:text-2xl lg:text-3xl md:font-semibold"
    >
      #{{ profile.id }}
    </div>

    <!-- Pokemon name -->
    <div
      class="flex justify-center text-2xl md:text-3xl lg:text-4xl md:font-semibold capitalize"
    >
      {{ profile.name }}
    </div>

    <!-- Pokemon picture -->
    <img class="mt-5 w-48 h-48 mx-auto" :src="profile.picture" />

    <!-- Pokemon types -->
    <div class="flex items-center flex-row justify-between gap-x-2 mr-4">
      <PokemonType
        v-for="(type, index) in profile.types"
        :key="index"
        :type-color="type"
      />
    </div>

    <!-- Pokemon weight & height -->
    <div class="flex flex-col gap-2 w-52 font-semibold text-lg">
      <div class="flex justify-start items-center">
        <img class="w-5 md:w-6 lg:w-7 mr-4" :src="heightIcon" />
        <div>{{ profile.height.m }} m / {{ profile.height.ft }} ft</div>
      </div>
      <div class="flex justify-start items-center">
        <img class="w-5 md:w-6 lg:w-7 mr-4" :src="weightIcon" />
        <div>{{ profile.weight.kg }} kg / {{ profile.weight.lbs }} lbs</div>
      </div>
    </div>
  </div>
</template>

<script>
import HeightIcon from "@/assets/images/icons/height.svg";
import WeightIcon from "@/assets/images/icons/weight.svg";
import PokemonType from "../SimpleCard/PokemonType.vue";

export default {
  components: { PokemonType },
  props: {
    profile: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      heightIcon: HeightIcon,
      weightIcon: WeightIcon,
    };
  },
};
</script>

<style></style>
