import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead,
} from '../../components/large/libs/util';
import { saveErrorLogger } from '../../api/data';
import router from '../../router';
import { routes } from '../../router';
import config from '@coms/large/libs/config';
const { homeName } = config;

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route);
  state.tagNavList = state.tagNavList.filter((item) => {
    return !routeEqual(item, route);
  });
  router.push(nextRoute);
};
const state = {
  breadCrumbList: [],
  tagNavList: [],
  homeRoute: {},
  local: localRead('local'),
  errorList: [],
  hasReadErrorPage: false,
};
const getters = {
  menuList: (state, getters, rootState) => getMenuByRouter(routes, rootState.user.access),
  errorCount: (state) => state.errorList.length,
};
const mutations = {
  setBreadCrumb(state, route) {
    state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
  },
  setHomeRoute(state, routes) {
    state.homeRoute = getHomeRoute(routes, homeName);
  },
  setTagNavList(state, list) {
    let tagList: any = [];
    if (list) {
      tagList = [...list];
    } else tagList = getTagNavListFromLocalstorage() || [];
    if (tagList[0] && tagList[0].name !== homeName) tagList.shift();
    let homeTagIndex = tagList.findIndex((item) => item.name === homeName);
    if (homeTagIndex > 0) {
      let homeTag = tagList.splice(homeTagIndex, 1)[0];
      tagList.unshift(homeTag);
    }
    state.tagNavList = tagList;
    setTagNavListInLocalstorage([...tagList]);
  },
  closeTag(state, route) {
    let tag = state.tagNavList.filter((item) => routeEqual(item, route));
    route = tag[0] ? tag[0] : null;
    if (!route) return;
    closePage(state, route);
  },
  addTag(state, { route, type = 'unshift' }) {
    let router = getRouteTitleHandled(route);
    if (!routeHasExist(state.tagNavList, router)) {
      if (type === 'push') state.tagNavList.push(router);
      else {
        if (router.name === homeName) state.tagNavList.unshift(router);
        else state.tagNavList.splice(1, 0, router);
      }
      setTagNavListInLocalstorage([...state.tagNavList]);
    }
  },
  setLocal(state, lang) {
    localSave('local', lang);
    state.local = lang;
  },
  addError(state, error) {
    state.errorList.push(error);
  },
  setHasReadErrorLoggerStatus(state, status = true) {
    state.hasReadErrorPage = status;
  },
};
const actions = {
  addErrorLog({ commit, rootState, state, dispatch }, info) {
    if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false);
    const {
      user: { token, userId, userName },
    } = rootState;
    let data = {
      ...info,
      time: Date.now(),
      token,
      userId,
      userName,
    };
    saveErrorLogger(info).then(() => {
      commit('addError', data);
    });
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};