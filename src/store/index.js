import { createStore } from "vuex";
import accordion from "./modules/accordion.js";
import sorting from "./modules/sorting.js";
//import pokemon from "./modules/pokemon.js";

export default createStore({
  state: {},
  mutations: {},
  actions: {
    // API calls
  },
  modules: {
    accordion,
    sorting,
    //pokemon,
  },
});
