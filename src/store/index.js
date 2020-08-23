import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';

Vue.use(Vuex);

const modules = require(`./#{view}`).default;
/* const vuex = new Vuex.Store({
  modules,
  plugins: [
    //createPersistedState(),
    //createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production',
});
  */
export default new Vuex.Store({
  /*   state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  }, */
  modules: modules,
});
