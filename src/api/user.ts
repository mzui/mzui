import fetch from './fetch'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return fetch({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return fetch({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return fetch({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return fetch({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return fetch({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return fetch({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return fetch({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return fetch({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return fetch({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}