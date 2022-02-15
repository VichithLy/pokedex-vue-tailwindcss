import { UPDATE_IS_OVER_CARD } from "@/store/mutation-types";

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

  actions: {},

  getters: {},
};
