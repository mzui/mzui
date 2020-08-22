import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

/**
 * 本地存储中心
 *
 */

class DB {
  async set(key: string, value: any, ttl: number = 0) {
    let obj = {
      startAt: Date.now(),
      ttl: ttl * 1000,
      value: value,
    };
    await Storage.set({
      key: 'user',
      value: JSON.stringify(obj),
    });
  }
  async get(key: string) {
    try {
      let str: any = await Storage.get({ key });
      if (str === null) return undefined;
      let obj = JSON.parse(str || '');
      if (obj.ttl <= 0) return obj.value;
      if (obj.startAt + obj.ttl < Date.now()) {
        this.del(key);
        return undefined;
      }
      return obj.value;
    } catch (err) {}
    return undefined;
  }
  async del(key: string) {
    await Storage.remove({ key });
  }
  async clear() {
    await Storage.clear();
  }
}
const db: DB = new DB();
const UserKey = 'username';
class Store {
  public readonly db: DB = db;
  async isLogin() {
    let username = await db.get(UserKey);
    return !!username;
  }
  async login(username) {
    await db.set(UserKey, username);
  }
  async logout(){
    let username = await this.get(UserKey);
    await db.del(username);
  }
  async set(key: string, value: any, ttl?: number) {
    let username = await this.get(UserKey);
    key = makeKey(username, key);
    db.set(key, value, ttl);
  }
  async get(key: string) {
    let username = await this.get(UserKey);
    key = makeKey(username, key);
    return db.get(key);
  }
  async del(key: string) {
    let username = await this.get(UserKey);
    key = makeKey(username, key);
    return db.del(key);
  }
  async clear() {
    await db.clear();
  }
}
function makeKey(user, key) {
  return user + '_' + key;
}

export default new Store();
