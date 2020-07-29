import layout from '@/layout';
import Forbidden from '@/layout/forbidden';
import NoPage from '@/layout/noPage';

// 通过webpack方法require.context方法对文件进行读取
// require.context(路径，是否遍历子文件夹内文件，匹配文件正则)
const files = require.context('./modules', true, /\.js/);
const routers = [];
files.keys().forEach(key => {
  const router = files(key).default;
  routers.push(...router);
});
routers.sort((a, b) => a.sort ? a.sort - b.sort : -1);
console.log(routers, 908);

const odinaryRoute = [
  {
    path: '/',
    redirect: '/guide',
    component: layout
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/layout/Login.vue')
  },
  ...routers
];

// 无权访问提示页
const ForbiddenRouter = [
  {
    path: '/403',
    component: Forbidden
  }
];

// 页面不存在提示页
const UndefinedPage = [
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: NoPage
  }
];

// const router = new Router({
//   routes: odinaryRoute
// })
export { odinaryRoute, ForbiddenRouter, UndefinedPage };
