const state = {
  user: null,
  isLogged: false
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    state.isLogged = true;
  },
  logout(state) {
    state.user = null;
    state.isLogged = false;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
