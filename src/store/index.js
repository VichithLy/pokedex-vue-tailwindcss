import { createStore } from "vuex";
import cursor from "./modules/cursor.js";
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
    cursor,
    accordion,
    sorting,
    //pokemon,
  },
});
