<template>
  <!-- Modal -->
  <teleport to="body">
    <!-- Page overlay -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-wrapper">
        <div
          ref="modal"
          class="w-10/12"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <!-- Close button -->
          <div class="flex w-full justify-end mb-2">
            <CloseButton @click="closeModal" />
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { hideBodyOverflowY } from "../../utils";
import useClickOutside from "../../composables/useClickOutside";
import CloseButton from "./CloseButton.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { UPDATE_SHOW_MODAL } from "../../store/mutation-types";

export default {
  components: {
    CloseButton,
  },
  setup() {
    // Store
    const { state, dispatch } = useStore();
    // ----- States
    const selectedPokemon = computed(() => state.pokemon.selectedPokemon);
    const showModal = computed(() => state.modal.showModal);
    // Refs
    const modal = ref(selectedPokemon.value.id);
    // Functions
    function closeModal() {
      dispatch("modal/" + UPDATE_SHOW_MODAL, false).then(
        hideBodyOverflowY(false),
      );
    }
    // Composable
    const { onClickOutside } = useClickOutside();

    onClickOutside(modal, () => {
      console.log("onClickOutside");
      closeModal();
    });

    return {
      selectedPokemon,
      showModal,
      closeModal,
      modal,
    };
  },
};
</script>

<style scoped>
/* .modal-wrapper {
  width: 90vw;

  max-height: calc(100vh - 10em);
  10em is for the header and the footer heights on mobile
} */
</style>
