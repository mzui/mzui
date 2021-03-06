import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import Cookies from 'js-cookie';

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
      key: key,
      value: JSON.stringify(obj),
    });
  }
  async get(key: string) {
    try {
      let obj: any = ((await Storage.get({ key })) || '').value;
      if (obj === null || obj === undefined) return undefined;
      obj = JSON.parse(obj);
      if (obj.ttl <= 0) return obj.value;
      if (obj.startAt + obj.ttl < Date.now()) {
        this.del(key);
        return undefined;
      }
      return JSON.parse(obj.value);
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
const UserKey = '___user___';
class Store {
  public readonly db: DB = db;
  async isLogin() {
    let user = await db.get(UserKey);
    return !!user;
  }
  async login(user) {
    if (user) {
      await db.set(UserKey, user);
      return user;
    } else {
      return await db.get(UserKey);
    }
  }
  async logout() {
    let username = await this.get(UserKey);
    await db.del(username);
    Cookies.remove('token');
  }
  async set(key: string, value: any, ttl?: number) {
    let username = await db.get(UserKey);
    key = makeKey(username, key);
    db.set(key, value, ttl);
  }
  async get(key: string) {
    let username = await db.get(UserKey);
    key = makeKey(username, key);
    return db.get(key);
  }
  async del(key: string) {
    let username = await db.get(UserKey);
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
