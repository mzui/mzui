import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import config from '../config';
import ui from '../common/ui';
import store from '@common/store';
Vue.use(VueRouter);
export const routes = require('./#{view}/routes').default;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  ui.loadingBar.start();
  const lang = to.params.lang || navigator.language;
  let setLang = router.app['$setLang'];
  lang && setLang instanceof Function && setLang.bind(router.app)(lang);

  let isLogin = await store.isLogin();
  console.log('isLogin', isLogin, from, to);
  if (to.path == '/login') {
    return next();
  }
  if (isLogin) {
    next();
  } else {
    // 未登录且要跳转的页面不是登录页
    next({
      path: '/login', // 跳转到登录页
    });
  }
});
router.afterEach((route) => {
  ui.loadingBar.finish();
});

export default router;
