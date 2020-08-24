import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '../common/store';
const zhCN = require('./lang/#{view}/zh-CN').default;

Vue.use(VueI18n);

let defaultLang = 'zh-CN';

const langUtil = {
  async get(vue?) {
    let lang = (await store.db.get('lang')) || navigator.language;
    if (vue) {
      try {
        lang = vue.$route?.params?.lang || lang;
      } catch (e) {}
    }
    await store.db.set('lang', lang);
    return lang;
  },
  async set(lang) {
    return store.db.set('lang', lang);
  },
};

const LocaleMap = {
  'zh-CN': zhCN,
};
const loadedLanguages = [defaultLang]; // 我们的预装默认语言
const i18n = new VueI18n({
  locale: defaultLang, //if you need get the browser language use following "window.navigator.language"
  fallbackLocale: defaultLang,
  messages: LocaleMap,
  silentTranslationWarn: true,
});

Vue.use((Vue, options) => {
  Vue.prototype.$setLang = async function (lang) {
    await loadLanguageAsync(lang);
  };
  Vue.prototype.$lang = function () {
    return i18n.locale;
  };
  Vue.prototype.$langList = function () {
    let list: string[] = [];
    for (let key in LocaleMap) {
      list.push(key);
    }
    return list;
  };
});
/**
 * 异步加载语言
 * @param lang
 */
async function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(async (msgs) => {
        i18n.setLocaleMessage(lang, msgs.default);
        i18n.locale = lang;
        await langUtil.set(lang);
      });
    }
  }
}
export default i18n;
