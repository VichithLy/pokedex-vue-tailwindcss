<template>
  <!-- Page overlay -->
  <teleport to="body">
    <div
      v-if="showModal"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
      @click="closeModal"
    ></div>
  </teleport>
  <!-- Modal -->
  <teleport to="body">
    <div
      v-if="showModal"
      class="fixed z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 overflow-y-auto detailed-modal"
    >
      <!-- FOR RESPONSIVENESS : -sm:border-pink-400 -border-4 -md:border-black -lg:border-green-400 -->
      <DetailedCard :pokemon-object="selectedPokemon" />
    </div>
  </teleport>
</template>

<script>
import DetailedCard from "../components/Cards/DetailedCard/DetailedCard.vue";
import { mapActions, mapState } from "vuex";
import { UPDATE_SHOW_MODAL } from "../store/mutation-types";
import { hideBodyOverflowY } from "../utils";

export default {
  components: {
    DetailedCard,
  },
  computed: {
    ...mapState("pokemon", ["selectedPokemon"]),
    ...mapState("modal", ["showModal"]),
  },
  methods: {
    ...mapActions("modal", [UPDATE_SHOW_MODAL]),
    closeModal() {
      this.UPDATE_SHOW_MODAL(false).then(hideBodyOverflowY(false));
    },
  },
};
</script>

<style scoped>
.detailed-modal {
  max-height: calc(
    100vh - 10em
  ); /* 10em is for the header and the footer heights on mobile */
}
</style>
