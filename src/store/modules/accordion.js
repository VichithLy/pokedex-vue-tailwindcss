import { UPDATE_IS_OPEN } from "@/store/mutation-types";

export default {
  namespaced: true,

  state() {
    return {
      isOpen: false,
    };
  },

  mutations: {
    [UPDATE_IS_OPEN](state, isOpen) {
      state.isOpen = isOpen;
    },
  },

  actions: {},

  getters: {},
};
