import { getParams } from './util';
const USER_MAP = {
  super_admin: {
    username: 'super_admin',
    userId: '1',
    access: ['super_admin', 'admin'],
    token: 'super_admin',
    nick: 'super_admin',
    avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
  },
  admin: {
    username: 'admin',
    userId: '2',
    access: ['admin'],
    token: 'admin',
    nick: 'admin',
    avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4',
  },
};

export const login = (req) => {
  req = JSON.parse(req.body);
  console.log('req', req);

  return { code: 200, data: {...USER_MAP[req.username] } };
};

export const getUserInfo = (req) => {
  const params = getParams(req.url);
  return USER_MAP[params.token];
};

export const logout = (req) => {
  return null;
};
