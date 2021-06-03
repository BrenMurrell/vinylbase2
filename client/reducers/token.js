import { SET_TOKEN } from '../actions/spotify'

const intialState = {
  access_token: localStorage.getItem('vb_access_token'),
  refresh_token: localStorage.getItem('vb_refresh_token'),
  user: localStorage.getItem('vb_user_id')
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.token
    default:
      return state
  }
}

export default reducer
