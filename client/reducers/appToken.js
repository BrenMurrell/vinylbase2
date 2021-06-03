import { SET_APP_TOKEN } from '../actions/spotify'

const intialState = []

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_APP_TOKEN:
      return action.token
    default:
      return state
  }
}

export default reducer
