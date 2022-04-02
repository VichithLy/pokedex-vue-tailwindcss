<template>
  <div class="dc-profile-container bg-gray-50 bg-opacity-60">
    <!-- Pokemon ID -->
    <div class="dc-profile-id-wrapper">#{{ profile.id }}</div>

    <!-- Pokemon picture -->
    <img
      v-if="profile.picture"
      class="dc-profile-picture-wrapper"
      :src="profile.picture"
    />

    <ErrorMessage v-else :message="'No image found!'" />

    <!-- Pokemon types -->
    <div class="dc-profile-types-wrapper md:border-green-700">
      <PokemonType
        v-for="(type, index) in profile.types"
        :key="index"
        :type="type"
      />
    </div>

    <!-- Pokemon weight & height -->
    <div class="dc-profile-hw-container font-semibold text-lg">
      <div class="dc-profile-hw-wrapper">
        <img class="dc-profile-hw-icon" :src="heightIcon" />
        <div>{{ getHeightInM }} m / {{ getHeightInFt }} ft</div>
      </div>
      <div class="dc-profile-hw-wrapper">
        <img class="dc-profile-hw-icon" :src="weightIcon" />
        <div>{{ getWeightInKg }} kg / {{ getWeightInLbs }} lbs</div>
      </div>
    </div>
  </div>
</template>

<script>
import HeightIcon from "@/assets/images/icons/height.svg";
import WeightIcon from "@/assets/images/icons/weight.svg";
import { hgToKg, hgToLbs, dmToFt, dmToM } from "../../../utils";
import PokemonType from "../SimpleCard/PokemonType.vue";
import ErrorMessage from "../../ErrorMessage.vue";

export default {
  components: { PokemonType, ErrorMessage },
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
  computed: {
    getWeightInKg() {
      return hgToKg(this.profile.weight);
    },
    getWeightInLbs() {
      return hgToLbs(this.profile.weight);
    },
    getHeightInM() {
      return dmToM(this.profile.height);
    },
    getHeightInFt() {
      return dmToFt(this.profile.height);
    },
  },
};
</script>

<style></style>
