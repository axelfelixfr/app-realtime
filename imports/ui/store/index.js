import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import user from "./user";
import crud from "./crud";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["user", "crud"]
});

const store = new Vuex.Store({
  modules: {
    user,
    crud
  },
  plugins: [vuexLocal.plugin]
});

export default store;
