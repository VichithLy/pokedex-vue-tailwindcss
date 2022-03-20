import { UPDATE_IS_OPEN } from "@/store/mutation-action-types";

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

  actions: {
    [UPDATE_IS_OPEN]({ commit }, isOpen) {
      commit(UPDATE_IS_OPEN, isOpen);
    },
  },

  getters: {},
};
