import { UPDATE_IS_OVER_CARD } from "@/store/mutation-action-types";

export default {
  namespaced: true,

  state() {
    return {
      isOverCard: false,
    };
  },

  mutations: {
    [UPDATE_IS_OVER_CARD](state, isOverCard) {
      state.isOverCard = isOverCard;
    },
  },

  actions: {
    [UPDATE_IS_OVER_CARD]({ commit }, isOverCard) {
      commit(UPDATE_IS_OVER_CARD, isOverCard);
    },
  },

  getters: {},
};
