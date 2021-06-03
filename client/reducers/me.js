import { SET_ME } from '../actions/spotify'

const intialState = 0

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_ME:
      return action.me
    default:
      return state
  }
}

export default reducer
