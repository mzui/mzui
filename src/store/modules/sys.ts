const state = {
  langList: [
    {
      value: 'CN',
      label: '中文简体',
    },
    {
      value: 'TW',
      label: '中文繁体',
    },
    {
      value: 'EN',
      label: 'English',
    },
  ],
  lang: navigator.language || 'CN',
};
const getters = {

  getLangList: (state) => () => {
    //方法访问
    return state.langList;
  }
};
const mutations = {

  setLogout: (state) => {
    state.user = {};
  },
};
const actions = {
  async initData(context, {  }) {
    
  },
  
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
