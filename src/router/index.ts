import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import config from '../config';
import ui from '../common/ui';
Vue.use(VueRouter);
const routes = require('./#{view}.router').routes;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  //ViewUI['LoadingBar'] && ViewUI['LoadingBar'].start();
  ui.loadingBar.start();
  next();
});
router.afterEach((route) => {
  //ViewUI['LoadingBar'] && ViewUI['LoadingBar'].finish();
  ui.loadingBar.finish();
});

export default router;
