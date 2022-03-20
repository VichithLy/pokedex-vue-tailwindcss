import {
  UPDATE_SELECTED_TYPES,
  UPDATE_SELECTED_REGION,
} from "@/store/mutation-action-types";
import { REMOVE_LAST_TYPE, SET_LAST_TYPE } from "../mutation-action-types";

export default {
  namespaced: true,

  state: {
    selectedTypes: [],
    selectedRegion: "",
  },

  mutations: {
    [UPDATE_SELECTED_TYPES](state, selectedTypes) {
      state.selectedTypes = selectedTypes;
    },
    [UPDATE_SELECTED_REGION](state, selectedRegion) {
      state.selectedRegion = selectedRegion;
    },
    [SET_LAST_TYPE](state, type) {
      state.selectedTypes[state.selectedTypes.length - 1] = type;
    },
    [REMOVE_LAST_TYPE](state) {
      state.selectedTypes.pop();
    },
  },

  actions: {
    [UPDATE_SELECTED_TYPES]({ commit }, selectedTypes) {
      commit(UPDATE_SELECTED_TYPES, selectedTypes);
    },
    [UPDATE_SELECTED_REGION]({ commit }, selectedRegion) {
      commit(UPDATE_SELECTED_REGION, selectedRegion);
    },
    [SET_LAST_TYPE]({ commit, state }, type) {
      if (state.selectedTypes.includes(type)) {
        commit(REMOVE_LAST_TYPE);
      }

      commit(SET_LAST_TYPE, type);
    },
  },

  getters: {},
};
