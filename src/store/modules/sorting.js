import {
  UPDATE_SELECTED_TYPES,
  UPDATE_SELECTED_REGIONS,
} from "@/store/mutation-types";

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
  },

  actions: {},

  getters: {},
};
