/**
 * 使用ui框架组件
 *
 */
import Vue from 'vue';
import config from '../config';
let UIFrame: any = require('./view-loader/view.#{view}.loader').UIFrame;

export interface Message {
  message: string | number;
  icon?: string;
  duration?: number;
  onClose?: Function;
}
const ui = {
  /** 提示轻提示 */
  toast(message: Message) {
    if (config.isLarge) {
      UIFrame.Message({
        content: message.message,
        closable: true,
      });
    } else {
      UIFrame.Toast({
        message: message.message,
        icon: message.icon,
      });
    }
  },
  loadingBar: {
    start() {
        config.isLarge ? UIFrame.LoadingBar.start() :  null;
    },
    finish() {
      config.isLarge ? UIFrame.LoadingBar.finish() :  null;
    },
    error() {
      config.isLarge ? UIFrame.LoadingBar.error() :  null;
    },
  },
};
Vue.use(async (Vue, options) => {
  Vue.prototype.$ui = ui;
  Vue.prototype.$toast = ui.toast;
  //analytics.trackStartup();
});
ui.toast({message: 'ok'})
export default ui;
