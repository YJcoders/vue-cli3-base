import layout from '@/layout';
const prePath = path => () => import(`@/views/${path}/index.vue`);

const Demo = [
  {
    sort: 3, // 用于菜单排序
    path: '/demo',
    component: layout,
    meta: { title: '购物车', icon: 'el-icon-shopping-cart-full' },
    children: [
      {
        path: '/demo',
        name: 'Demo',
        component: prePath('Demo')
      }
    ]
  }
];

export default Demo;
