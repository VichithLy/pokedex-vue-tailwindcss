import {
  UPDATE_SELECTED_TYPES,
  UPDATE_SELECTED_REGIONS,
} from "@/store/mutation-types";
import { REMOVE_LAST_TYPE, SET_LAST_TYPE } from "../mutation-types";

export default {
  namespaced: true,

  state: {
    selectedTypes: [],
    selectedRegions: [],
  },

  mutations: {
    [UPDATE_SELECTED_TYPES](state, selectedTypes) {
      state.selectedTypes = selectedTypes;
    },
    [UPDATE_SELECTED_REGIONS](state, selectedRegions) {
      state.selectedRegions = selectedRegions;
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
    [UPDATE_SELECTED_REGIONS]({ commit }, selectedRegions) {
      commit(UPDATE_SELECTED_REGIONS, selectedRegions);
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
