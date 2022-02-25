<template>
  <teleport to="body">
    <div
      v-if="showModal"
      ref="modal-backdrop"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 border-4"
      @click="UPDATE_SHOW_MODAL(!showModal)"
    >
      <div class="flex justify-center items-center h-full">
        <div
          v-show="showModal"
          ref="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          class="w-11/12 -sm:border-pink-400 -border-4 -md:border-black -lg:border-green-400"
        >
          <DetailedCard :pokemon-object="selectedPokemon" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import DetailedCard from "../components/Cards/DetailedCard/DetailedCard.vue";
import { mapActions, mapState } from "vuex";
import { UPDATE_SHOW_MODAL } from "../store/mutation-types";

export default {
  name: "ModalDialog",
  components: {
    DetailedCard,
  },
  computed: {
    ...mapState("pokemon", ["selectedPokemon"]),
    ...mapState("modal", ["showModal"]),
  },
  methods: {
    ...mapActions("modal", [UPDATE_SHOW_MODAL]),
  },
};
</script>

<style></style>
