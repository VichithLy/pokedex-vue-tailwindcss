import { createStore } from "vuex";
import cursor from "./modules/cursor.js";
import accordion from "./modules/accordion.js";
import sorting from "./modules/sorting.js";
import pokemon from "./modules/pokemon.js";
import modal from "./modules/modal.js";

export default createStore({
  modules: {
    cursor,
    accordion,
    sorting,
    pokemon,
    modal,
  },
});
