import axios from '../http';
// import config from '../config';

// const { url } = config[process.env.NODE_ENV];
// 不同的页面，对应的IP可能不一样，此处可灵活配置
// const api = url;
// const api = mock;
// console.log(api, 999);

export default {
  // 登录
  // toLogin: (data) => axios.post(`${api.login}/login`, data),
  toLogin: (data) => axios.post(`/api/user/login`, data),
  // 获取用户信息
  // getUserInfo: (userId) => axios.get(`${api.getUserInfo}/getUserInfo?userId=${userId}`),
  getUserInfo: (userId) => axios.get(`/api/user/getUserInfo?userId=${userId}`),
  // 测试获取文件
  getFile: () => axios.get('http://localhost:3000/test/download', {
    responseType: 'blob'
  })
};
