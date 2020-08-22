import fetch from './fetch'

export const getRouterReq = (access) => {
  return fetch({
    url: 'get_router',
    params: {
      access
    },
    method: 'get'
  })
}
