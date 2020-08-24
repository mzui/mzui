import * as user from './user';
import * as routers from './routers';
import * as data from './data';
import config from '../config';
if (config.apiMock) require('@/api/mock');

export { user, routers, data };
export default {
  user,
  routers,
  data,
};
