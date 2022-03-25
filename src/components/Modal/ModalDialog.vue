<template>
  <!-- <teleport to="body"> -->
  <!-- Page overlay -->
  <div class="modal-overlay">
    <!-- Modal -->
    <div class="modal-wrapper">
      <!-- Close button -->
      <!-- <div class="flex w-full justify-end pr-2">
        <CloseButton @click="closeModal" />
      </div> -->
      <div
        ref="modal"
        class="w-11/12"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <!-- Content -->
        <slot></slot>
      </div>
    </div>
  </div>
  <!-- </teleport> -->
</template>

<script>
import { hideBodyOverflowY } from "../../utils";
import useClickOutside from "../../composables/useClickOutside";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { UPDATE_SHOW_MODAL } from "../../store/mutation-action-types";

export default {
  components: {
    //CloseButton,
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
    onClickOutside(modal, () => closeModal());

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
