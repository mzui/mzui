import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import config from '../config';
//import smallRoutes from './small.router';
const smallRoutes = require('./small.router');
Vue.use(VueRouter);
const routes = config.isLarge() ? require('./large.router').routes : require('./small.router').routes;

console.log('....routes', routes)
/* 
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/About.vue'),
  },
]; */


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
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
