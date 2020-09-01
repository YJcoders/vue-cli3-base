import layout from '@/layout';
const prePath = path => () => import(`@/views/${path}/index.vue`);

const Echarts = [
  {
    sort: 3, // 用于菜单排序
    path: '/echarts',
    component: layout,
    meta: { title: 'Echarts', icon: 'el-icon-shopping-cart-full' },
    children: [
      {
        path: '/echarts',
        name: 'Echarts',
        component: prePath('Echarts')
      }
    ]
  }
];

export default Echarts;
