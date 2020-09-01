import $axios from '@/api';
export default {
  getUserInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      $axios.user.getUserInfo({ username: data }).then(res => {
        commit('updateUserInfo', res);
        resolve();
      });
    });
  }
};
