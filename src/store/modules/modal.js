import { UPDATE_SHOW_MODAL } from "../mutation-action-types.js";

export default {
  namespaced: true,

  state() {
    return { showModal: false };
  },

  mutations: {
    [UPDATE_SHOW_MODAL](state, showModal) {
      state.showModal = showModal;
    },
  },

  actions: {
    [UPDATE_SHOW_MODAL]({ commit }, showModal) {
      commit(UPDATE_SHOW_MODAL, showModal);
    },
  },

  getters: {},
};
