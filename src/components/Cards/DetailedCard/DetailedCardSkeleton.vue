<template>
  <div class="dc-container skeleton-0">
    <div class="dc-header">
      <div class="dc-name text-transparent">
        <div class="rounded-lg w-2/5 skeleton-1">text</div>
      </div>
      <CloseButton />
    </div>

    <!-- profile -->
    <div class="dc-profile-container skeleton-1 text-transparent">
      <!-- ID -->
      <div class="dc-profile-id-wrapper skeleton-2-pulse rounded-lg">text</div>
      <!-- name -->
      <div class="dc-profile-name-wrapper skeleton-2-pulse rounded-lg w-52">
        text
      </div>
      <!-- picture -->
      <div
        class="dc-profile-picture-wrapper skeleton-2-pulse rounded-full"
      ></div>
      <!-- types -->
      <div
        class="dc-profile-types-wrapper skeleton-2-pulse w-10 h-10 rounded-full"
      ></div>
      <!-- weight & height -->
      <div class="dc-profile-hw-container">
        <div class="dc-profile-hw-wrapper">
          <div
            class="dc-profile-hw-icon w-7 h-7 rounded-full skeleton-2-pulse"
          ></div>
          <div class="w-28 h-full skeleton-2-pulse rounded-lg"></div>
        </div>
        <div class="dc-profile-hw-wrapper">
          <div
            class="dc-profile-hw-icon w-7 h-7 rounded-full skeleton-2-pulse"
          ></div>
          <div class="w-36 h-full skeleton-2-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
    <!-- about -->
    <div class="dc-about-container border-2 text-transparent skeleton-1">
      <div class="dc-about-title-wrapper skeleton-2-pulse">text</div>
      <p class="dc-about-content-wrapper skeleton-2-pulse p-0 rounded-lg">
        text
      </p>
      <p
        class="dc-about-content-wrapper skeleton-2-pulse p-0 rounded-lg w-10/12"
      >
        text
      </p>
    </div>
    <!-- base stats  -->
    <div class="dc-stats-container skeleton-1">
      <div class="dc-stats-title-wrapper skeleton-2-pulse text-transparent">
        text
      </div>
      <div class="dc-stats-list">
        <div v-for="n in 6" :key="n" class="dc-stats-graph-wrapper">
          <div class="w-9 h-9 skeleton-2-pulse rounded-full"></div>
          <div
            class="w-10/12 ml-3 skeleton-2-pulse rounded-full dc-stats-graph-pct text-transparent"
          >
            text
          </div>
        </div>
      </div>
    </div>
    <!-- abilities  -->
    <div class="dc-abilities-container text-transparent skeleton-1">
      <div class="dc-abilities-title-wrapper skeleton-2-pulse">text</div>
      <!-- Abilities text -->
      <div class="dc-abilities-content-wrapper">
        <ul class="dc-abilities-ul">
          <li class="rounded-lg skeleton-2-pulse w-28">text</li>
          <li class="rounded-lg skeleton-2-pulse w-20">text</li>
          <li class="rounded-lg skeleton-2-pulse w-24">text</li>
        </ul>
      </div>
    </div>
    <!-- evolution  -->
    <div class="dc-evolution-container skeleton-1 text-transparent">
      <div class="dc-evolution-title-wrapper skeleton-2-pulse">text</div>
      <div class="dc-evolution-evolutions-wrapper">
        <div v-for="n in 3" :key="n" class="dc-evolution-boxes-container">
          <div class="dc-evolution-box-wrapper skeleton-2-pulse"></div>
          <div
            class="dc-evolution-box-label rounded-lg w-full skeleton-2-pulse"
          >
            text
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseButton from "../../Modal/CloseButton.vue";
export default { components: { CloseButton } };
</script>

<style scoped></style>
