import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import config from '../config';
//import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => {});
};
/* import LargeRouter from './large.router';
import SmallRouter from './small.router';
 */ 
const routes = config.isLarge() ? require('./large.router') : require('./small.router');
console.log("routes==========", routes)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});


router.beforeEach(async (to, from, next) => {
  //ViewUI['LoadingBar'] && ViewUI['LoadingBar'].start();
  console.log("........", from, to);
  next();
});
/* router.afterEach((route) => {
  ViewUI['LoadingBar'] && ViewUI['LoadingBar'].finish();
});
 */
export default router;
