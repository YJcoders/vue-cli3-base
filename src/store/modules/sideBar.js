const state = {
  collapse: false
};
const mutations = {
  toggleSide: state => {
    state.collapse = !state.collapse;
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
