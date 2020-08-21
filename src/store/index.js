import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';

Vue.use(Vuex);

const vuex = new Vuex.Store({
  modules,
  plugins: [
    //createPersistedState(),
    //createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production',
});
 

/* Vue.use((Vue, options) => {
  Vue['$vuex'] = vuex;
}); */
 
(async () => {
 
})();
export default vuex;
