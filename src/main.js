import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import '@babel/polyfill';
import App from './App.vue';
import { odinaryRoute, ForbiddenRouter, UndefinedPage } from './router';
import Axios from '@/api';
import ElementUI from 'element-ui';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.less';

Vue.use(Router);
Vue.use(ElementUI);

Vue.prototype.$axios = Axios;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

// const isProduction = process.env.NODE_ENV === 'production';
const router = new Router({
  // mode: 'history',
  // base: isProduction ? '/vue/' : '',
  base: '/',
  routes: odinaryRoute.concat(ForbiddenRouter).concat(UndefinedPage)
});

// 登陆拦截
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    if (store.state.userInfo.name) {
      next();
    } else {
      store.dispatch('getUserInfo', store.state.userInfo).then(() => {
        // 如果是获取动态菜单
        // store.dispatch('getMenuList').then(res => {

        // })
      });
    }
    next();
  } else {
    if (to.name === 'login') return next();
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
