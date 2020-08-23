// 导入模块
import Vue from 'vue';
import axios from 'axios';
import config from '../config';
import store from '../common/store';
import i18n from '../locale';
import ui from '../common/ui';
const isDev = process.env.NODE_ENV === 'development';
import logger from '../common/logger';

const ReqCachePrefix = 'req-cache-prefix-';
axios.defaults.withCredentials = true;
export default function fetch(options): Promise<any> {
  if (typeof options === 'string') {
    let url = options;
    options = {
      url: url,
    };
  }
  options.url = /^https?:\/\//.test(options.url) ? options.url : config.apiHost + '/' + options.url.replace(/^\/+/, '');
  let reqUid = ReqCachePrefix + options.url + '-' + JSON.stringify(options.data);
  function isApiServer() {
    return options.url.startsWith(config.apiHost);
  }

  return new Promise(async (resolve, reject) => {
    //let user = await store.get('user');
    const instance = axios.create({
      //baseURL: SERVER_BASE_URL||'',
      timeout: 60 * 1000,
      //withCredentials: false,
      headers: {
        //device: config.device,
        //lang: i18n.locale,
        //token: user?.token,
        //version: config.appVersion
        'accept-language': i18n.locale,
      },
    });
    // http request 拦截器
    instance.interceptors.request.use(
      (config) => {
        ui.loadingBar.start();
        // config.headers.Authorization = 'token'
        return config;
      },
      (err) => {
        logger.error('interceptors request error', err.message);
        ui.loadingBar.error();
        //analytics.trackError({ message: err.message, position: 'request' });
        return Promise.reject(err);
      },
    );

    // http response 拦截器
    instance.interceptors.response.use(
      (response) => {
        ui.loadingBar.finish();
        return response;
      },
      (err) => {
        ui.loadingBar.error();
        if (err) {
          logger.error('interceptors response error', err.message);
          //analytics.trackError({ message: err.message, position: 'response' });
        }
        return Promise.reject(err); // 返回接口返回的错误信息
      },
    );

    // 请求处理
    instance(options)
      .then((res: any) => {
        if (isApiServer()) {
          let data = res.data;
          if (data.code && data.code == 502) {
            return store.logout();
          }
          if (res.code == 200) {
            store.set(reqUid, data, 24 * 60 * 60);
          }
          resolve(data);
        } else {
          resolve(res);
        }
      })
      .catch(async (err) => {
        if (isApiServer()) {
          logger.error('request error ', err.message);
          //analytics.trackError({ message: err.message, position: 'c' });
          let data = await store.get(reqUid).catch((err) => err);
          if (data == err || data === undefined) {
            ui.toast({
              message: '错误原因 ' + err.message,
            });
            reject(err);
          } else {
            resolve(data);
          }
        } else {
          reject(err);
        }
      });
  });
}

window['fetch'] = fetch;
