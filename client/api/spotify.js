import request from 'superagent'

const baseUrl = '/api/v1/spotify'

export const getMe = () => {
  return request.get(`${baseUrl}/me`)
    .query({ access_token: localStorage.getItem('vb_access_token') })
    .then(res => {
      return res.body
    })
}

export const getSearch = () => {
  return request.get(`${baseUrl}/search`)
    .then(res => {
      return res.body
    })
}

export const getAppToken = () => {
  return request.get(`${baseUrl}/appToken`)
    .then(res => {
      return res.body
    })
}

export const getAuthTokens = (code, grantType = 'authorization_code', codeType = 'code') => {
  return request.get(`${baseUrl}/userTokens`)
    .query({ code, grantType, codeType })
    .then(res => {
      return res.body
    })
}

export const getRefreshedToken = (refreshToken) => {
  return request.get(`${baseUrl}/refresh-token`)
    .query({ refreshToken: refreshToken })
    .then(newTokenData => {
      return newTokenData
    })
}

export const getSearchResults = (searchObj) => {
  const accessToken = localStorage.getItem('vb_access_token')
  return request.get(`${baseUrl}/search?q=${searchObj.q}&type=${searchObj.type}&access_token=${accessToken}`)
    .then(res => {
      return res.body
    })
}
