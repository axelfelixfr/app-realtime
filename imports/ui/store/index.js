import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import user from "./user";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["user"]
});

const store = new Vuex.Store({
  modules: {
    user
  },
  plugins: [vuexLocal.plugin]
});

export default store;
