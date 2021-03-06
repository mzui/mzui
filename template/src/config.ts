const EnvConfig = require('./env/#{view}.config').default;

export enum Platform {
  Android = 'android',
  Ios = 'ios',
  Window = 'window',
}
export enum Target {
  AndroidMobile = 'android_mobile',
  AndroidTv = 'android_tv',
  Electron = 'electron',
  Ios = 'ios',
}
const isDev = process.env.NODE_ENV === 'development';
const Config = {
  isDev: isDev,
  loggerLevel: 'log',
  apiMock: true,
  platform: process.env.Platform,
  target: process.env.Target,
  view: process.env.View,
  isLarge: process.env.View == 'large',
  apiHost: 'http://127.0.0.1:8081',
  path(path: string) {
    return path;
  },
  ...EnvConfig,
};
export default Config;
