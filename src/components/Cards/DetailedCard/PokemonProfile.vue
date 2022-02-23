<template>
  <div class="dc-profile-container bg-gray-50 bg-opacity-60">
    <!-- Pokemon ID -->
    <div
      class="dc-profile-id-wrapper text-xl md:text-2xl lg:text-3xl md:font-semibold"
    >
      #{{ profile.id }}
    </div>

    <!-- Pokemon name -->
    <div
      class="dc-profile-name-wrapper text-2xl md:text-3xl lg:text-4xl md:font-semibold capitalize"
    >
      {{ profile.name }}
    </div>

    <!-- Pokemon picture -->
    <img class="dc-profile-picture-wrapper" :src="profile.picture" />

    <!-- Pokemon types -->
    <div class="dc-profile-types-wrapper">
      <PokemonType
        v-for="(type, index) in profile.types"
        :key="index"
        :type-color="type"
      />
    </div>

    <!-- Pokemon weight & height -->
    <div class="dc-profile-hw-container font-semibold text-lg">
      <div class="dc-profile-h-wrapper">
        <img class="w-5 md:w-6 lg:w-7 mr-4" :src="heightIcon" />
        <div>{{ profile.height.m }} m / {{ profile.height.ft }} ft</div>
      </div>
      <div class="dc-profile-w-wrapper">
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
