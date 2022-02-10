import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isOpen: false,
      selectedTypes: [],
      selectedRegions: [],
    };
  },
  mutations: {
    updateIsOpen(state, payload) {
      state.isOpen = payload.isOpen;
    },
    updateSelectedTypes(state, selectedTypes) {
      state.selectedTypes = selectedTypes;
    },
    updateSelectedRegions(state, selectedRegions) {
      state.selectedRegions = selectedRegions;
    },
  },
  actions: {},
  modules: {},
});
