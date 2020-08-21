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
const Config = {
  platform: Platform.Android,
  target: Target.AndroidMobile,
  get viewport() {
    let v = process.env.Viewport;
    return !!v ? v : 'small';
  },
  isLarge(){
      return Config.viewport == 'large'
  }
};
export default Config;
