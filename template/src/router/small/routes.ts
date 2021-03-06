import LayoutHomeSmall from '@coms/small/LayoutDefault.vue';

export const routes = [
  {
    path: '/',
    name: 'index',
    component: LayoutHomeSmall,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@views/small/Home.vue'),
        //icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true, // 是否需要登录
          title: '首页',
        },
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@views/small/About.vue'),
        //icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true, // 是否需要登录
          title: '关于',
        },
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@views/small/Search.vue'),
        //icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true, // 是否需要登录
          title: '搜索',
        },
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@views/small/Setting.vue'),
        //icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true, // 是否需要登录
          title: '设置',
        },
      },
    ],
  },
];
export default routes;
