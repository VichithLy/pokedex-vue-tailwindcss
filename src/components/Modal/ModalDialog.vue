<template>
  <!-- <teleport to="body"> -->
  <!-- Page overlay -->
  <div class="modal-overlay">
    <!-- Modal -->
    <div class="modal-wrapper">
      <div
        ref="modal"
        class="w-11/12 outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        tabindex="0"
        @keydown.esc="closeModal"
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
import { computed, onMounted, ref } from "vue";
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

    onMounted(() => {
      // To be able to use escape key on modal
      modal.value.focus();
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
