import axios from 'axios';
import { Message } from 'element-ui';

// 设置允许携带cookie
axios.defaults.withCredentials = true;
// const CancelToken = axios.CancelToken
// const requestMap = new Map() // 请求池

// 提示框
const message = msg => {
  Message({
    message: msg,
    duration: 1000,
    showClose: true,
    type: 'warning'
  });
};

// 跳转登录页时携带当前页面路由，以期在登录页面完成登录后返回当前页面
const toLogin = () => {
  window.location.href.replace({
    path: '/login',
    query: {
      redirect: window.location.href
    }
  });
};

// 统一错误处理
const handleError = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403: 登录过期，跳转登录页
    case 403:
      window.localStorage.removeItem('token1');
      message('登录过期，请重新登录');
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      message('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
};

// 对返回数据统一处理，没有特殊要求，统一返回请求成功的数据，失败被拦截
// 请求接口添加配置，可获取所有数据
let isGetAllRes = false;

export default function Ajax(baseURL) {
  const $http = axios.create({
    baseURL,
    timeout: 30 * 1000,
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded charset=utf-8"
      'Content-Type': 'application/json; charset=utf-8'
    }
  });

  // 添加请求拦截器
  $http.interceptors.request.use(config => {
    if (config.isGetAllRes) {
      isGetAllRes = true;
    } else {
      isGetAllRes = false;
    }
    // token鉴权，每次请求都会携带token，验证是否有token，token是否过期
    // 存储token有存储在本地localStorage, 有存在状态管理里面（状态管理里面刷新就没了）
    const token = window.localStorage.getItem('token1');
    if (token) {
      config.headers.access_token = token;
    }

    // 防止重复发起同一个请求
    // let uniqueCode = config.method.toLowerCase() + config.baseURL + config.url
    // if (requestMap.get(uniqueCode)) { // 取消重复请求
    //   config.cancelToken = new CancelToken(cancel => cancel('请不要重复提交请求！'))
    // }
    // requestMap.set(uniqueCode, true)
    return config;
  }, (error) => {
    message(error.message);
    return Promise.reject(error);
  });

  // 添加响应拦截
  $http.interceptors.response.use(response => {
    // 剔除请求池中完成的请求
    // let uniqueCode = response.config.method.toLowerCase() + response.config.url
    // requestMap.delete(uniqueCode)
    // console.log(response, 'respose')
    if (response.status === 200) {
      return isGetAllRes ? Promise.resolve(response) : Promise.resolve(response.data);
    } else {
      return Promise.reject(new Error(response.data.message));
    }
  }, (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      handleError(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      message('网络似乎出现问题，请稍后重试');
    }
  });
  return $http;
}
