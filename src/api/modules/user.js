import Ajax from '../http';
import config from '../config';

const { api } = config[process.env.NODE_ENV];
// 不同的页面，对应的IP可能不一样，此处可灵活配置
const axios = Ajax('http://127.0.0.1:3000');
export default {
  // 登录
  toLogin: (data) => axios.post(`${api.user}/login`, data),
  // 获取用户信息
  getUserDetail: () => axios.get(`${api.user}/detail`),
  // 测试获取文件
  getFile: () => axios.get('http://localhost:3000/test/download', {
    responseType: 'blob'
  })
};
