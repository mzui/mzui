import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import config from '../config';
import ui from '../common/ui';
Vue.use(VueRouter);
export const routes = require('./#{view}/routes').default;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  //ViewUI['LoadingBar'] && ViewUI['LoadingBar'].start();
  ui.loadingBar.start();
  const lang = to.params.lang || navigator.language;
  let setLang = router.app['$setLang'];
  //console.log(">>>>>>>>11", lang, lang && setLang instanceof Function );
  lang && setLang instanceof Function && setLang.bind(router.app)(lang);
  next();
});
router.afterEach((route) => {
  //ViewUI['LoadingBar'] && ViewUI['LoadingBar'].finish();
  ui.loadingBar.finish();
});

export default router;
