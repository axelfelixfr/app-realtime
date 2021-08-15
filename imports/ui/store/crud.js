const state = {
  register: null
};

const mutations = {
  setRegister(state, register) {
    state.register = register;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
