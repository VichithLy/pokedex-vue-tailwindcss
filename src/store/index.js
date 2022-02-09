import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isOpen: false,
    };
  },
  mutations: {
    setIsOpen(state, payload) {
      state.isOpen = payload.isOpen;
    },
  },
  actions: {},
  modules: {},
});
