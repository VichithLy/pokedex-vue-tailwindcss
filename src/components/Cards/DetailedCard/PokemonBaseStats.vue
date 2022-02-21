<template>
  <div
    class="flex flex-col justify-between gap-y-6 p-5 md:row-span-2 rounded-2xl bg-gray-100 bg-opacity-60"
  >
    <div
      class="flex justify-center rounded-2xl text-xl font-semibold md:font-bold lg:text-2xl bg-gray-500 bg-opacity-30"
    >
      Base stats
    </div>

    <!-- Base stats graph -->
    <div class="flex flex-col gap-y-4">
      <div class="flex items-center">
        <img :src="heartIcon" class="w-9 icon-heart" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-500 bg-opacity-30 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: baseStats.hp + '%',
              }"
            >
              {{ baseStats.hp }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <img :src="swordIcon" class="w-9 icon-sword" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-500 bg-opacity-30 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: baseStats.attack + '%',
              }"
            >
              {{ baseStats.attack }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <img :src="shieldIcon" class="w-9 icon-shield" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-500 bg-opacity-30 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: baseStats.defense + '%',
              }"
            >
              {{ baseStats.defense }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <img :src="speedIcon" class="w-9 icon-speed" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-500 bg-opacity-30 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: baseStats.speed + '%',
              }"
            >
              {{ baseStats.speed }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <img :src="heartIcon" class="w-9 icon-heart" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-500 bg-opacity-30 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: baseStats.specialAttack + '%',
              }"
            >
              {{ baseStats.specialAttack }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <img :src="heartIcon" class="w-9 icon-shield" />
        <div class="w-10/12 ml-3">
          <div class="bg-gray-500 bg-opacity-30 rounded-full">
            <div
              class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              :style="{
                width: baseStats.specialDefense + '%',
              }"
            >
              {{ baseStats.specialDefense }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeartIcon from "@/assets/images/icons/heart.svg";
import ShieldIcon from "@/assets/images/icons/shield.svg";
import SpeedIcon from "@/assets/images/icons/speed.svg";
import SwordIcon from "@/assets/images/icons/sword.svg";
export default {
  props: {
    baseStats: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      heartIcon: HeartIcon,
      shieldIcon: ShieldIcon,
      swordIcon: SwordIcon,
      speedIcon: SpeedIcon,
    };
  },
};
</script>

<style>
.icon-heart {
  filter: invert(12%) sepia(74%) saturate(7497%) hue-rotate(11deg)
    brightness(96%) contrast(103%);
}
.icon-shield {
  filter: invert(47%) sepia(53%) saturate(9%) hue-rotate(339deg) brightness(96%)
    contrast(89%);
}
.icon-sword {
  filter: invert(43%) sepia(96%) saturate(2358%) hue-rotate(173deg)
    brightness(98%) contrast(101%);
}
.icon-speed {
  filter: brightness(0) saturate(100%) invert(50%) sepia(79%) saturate(2498%)
    hue-rotate(88deg) brightness(122%) contrast(122%);
}
.icon-sp-heart {
  filter: invert(12%) sepia(74%) saturate(7497%) hue-rotate(11deg)
    brightness(96%) contrast(103%);
}
.icon-sp-shield {
  filter: invert(47%) sepia(53%) saturate(9%) hue-rotate(339deg) brightness(96%)
    contrast(89%);
}
</style>
