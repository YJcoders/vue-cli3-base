const state = {
  isShow: true,
  collapse: false
};
const mutations = {
  setSideShow: (state, val) => {
    state.isShow = val;
  },
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
