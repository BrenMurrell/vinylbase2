/* eslint-disable promise/no-nesting */
import { getMe, getAppToken, getAuthTokens, getSearchResults, getRefreshedToken } from '../api/spotify'

export const SET_ME = 'SET_ME'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const SET_APP_TOKEN = 'SET_APP_TOKEN'

export const setMe = (me) => {
  return {
    type: SET_ME,
    me
  }
}

export const fetchMe = () => {
  return dispatch => {
    return getMe()
      .then(me => {
        localStorage.setItem('vb_user_id', me.id)
        return dispatch(setMe(me))
      })
  }
}

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token
  }
}

export const setAppToken = (token) => {
  return {
    type: SET_APP_TOKEN,
    token
  }
}

export const fetchAppToken = () => {
  return dispatch => {
    return getAppToken()
      .then(token => {
        return dispatch(setAppToken(token))
      })
  }
}

export const fetchTokens = (code) => {
  return dispatch => {
    return getAuthTokens(code)
      .then(res => {
        const userData = JSON.parse(res.text)
        localStorage.setItem('vb_access_token', userData.access_token)
        localStorage.setItem('vb_refresh_token', userData.refresh_token)
        const token = {
          access_token: userData.access_token,
          refresh_token: userData.access_token,
          fullDeets: userData
        }
        return dispatch(setToken(token))
      })
  }
}

const setSearchResults = (searchResults) => {
  return {
    type: SET_SEARCH_RESULTS,
    searchResults
  }
}

export const fetchNewToken = (searchObj) => {
  const refreshToken = localStorage.getItem('vb_refresh_token')

  return dispatch => {
    return getRefreshedToken(refreshToken)
      .then(res => {
        const userData = res.body
        localStorage.setItem('vb_access_token', userData.access_token)
        return dispatch(fetchSearchResults(searchObj))
      })
  }
}

export const fetchSearchResults = (searchObj) => {
  const refreshToken = localStorage.getItem('vb_refresh_token')
  return dispatch => {
    return getSearchResults(searchObj)
      .then(searchResults => {
        if (searchResults.error) {
          return getRefreshedToken(refreshToken)
            .then(res => {
              const userData = res.body
              localStorage.setItem('vb_access_token', userData.access_token)
              return dispatch(fetchNewToken(searchObj))
            })
        } else {
          return dispatch(setSearchResults(searchResults))
        }
      })
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('vb_access_token')
    localStorage.removeItem('vb_refresh_token')
    localStorage.removeItem('vb_user_id')
    const token = {
      access_token: '',
      refresh_token: '',
      user_id: ''
    }
    return dispatch(setToken(token))
  }
}
