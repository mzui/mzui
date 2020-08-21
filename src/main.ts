import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuexStore from './store';
import config from './config';

Vue.config.productionTip = false;

if(config.viewport == 'large'){
  
}else{
  require('vant/lib/index.css');
  Vue.use(require('vant'));
  console.log(">>>>>>>>>>>>", require('vant'))
}

new Vue({
  router,
  store: vuexStore,
  render: (h) => h(App),
}).$mount('#app');
