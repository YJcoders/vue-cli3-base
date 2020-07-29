import layout from '@/layout';
const prePath = path => () => import(`@/views/Home/${path}/index.vue`);

const Home = [
  {
    sort: 1, // 用于菜单排序
    path: '/guide',
    component: layout,
    meta: { title: '引导页', icon: 'el-icon-position' },
    children: [
      {
        path: '/guide',
        name: 'Guide',
        component: prePath('Guide')
      }
    ]
  },
  {
    sort: 2, // 用于菜单排序
    path: '/outLink',
    name: 'OutLink',
    component: () => import('@/views/Home/OutLink.vue'),
    meta: { title: '外链', icon: 'el-icon-link' }
  }
];

export default Home;
