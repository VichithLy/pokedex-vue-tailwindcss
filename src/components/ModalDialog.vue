<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showModal"
        ref="modal-backdrop"
        class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
      >
        <div class="flex items-start justify-center min-h-screen text-center">
          <div
            ref="modal"
            class="rounded-lg text-left overflow-hidden shadow-xl p-28"
            role="dialog"
            aria-modal="true"
            v-show="showModal"
            aria-labelledby="modal-headline"
          >
            <div class="flex flex-col justify-center gap-y-12 mt-10">
              <DetailedCard
                :pokemon-object="selectedPokemon"
                @click="closeModal"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import DetailedCard from "../components/Cards/DetailedCard/DetailedCard.vue";
import { ref, watch } from "vue";
import { mapState } from "vuex";
import PokemonsArray from "@/constants/pokemons_array.json";

export default {
  name: "ModalDialog",
  components: {
    DetailedCard,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const showModal = ref(false);

    function closeModal() {
      showModal.value = false;
    }

    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
      },
    );

    return {
      showModal,
      closeModal,
    };
  },
  data() {
    return {
      PokemonsArray,
    };
  },
  computed: {
    ...mapState("pokemon", ["selectedPokemon"]),
  },
};
</script>

<style scoped></style>
