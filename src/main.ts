import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuexStore from './store';
import config from './config';
import logger from './common/logger';
import moment from 'moment';
import store from './common/store';
import query from './common/domquery';
import './common/ui';
import importDirective from './directive';
import i18n from './locale';
Vue.config.productionTip = false;
/**
 * 注册指令
 */
importDirective(Vue);
Vue.use(async (Vue, options) => {
  Vue.prototype.$ = function (...args) {
    return query(...args);
  };
  //Vue.prototype.$store = store;
  Vue.prototype.$isDev = config.isDev;
  Vue.prototype.$logger = logger;
  Vue.prototype.$fetch = fetch;
  Vue.prototype.$moment = moment;
  Vue.prototype.$config = config;
  //analytics.trackStartup();
});
if (process.env.NODE_ENV !== 'production') require('@/api/mock');

/* if (config.view == 'large') {
} else {
  require('vant/lib/index.css');
  Vue.use(require('vant'));
} */

new Vue({
  router,
  i18n,
  store: vuexStore,
  render: (h) => h(App),
}).$mount('#app');
