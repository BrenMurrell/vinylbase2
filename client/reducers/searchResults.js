import { SET_SEARCH_RESULTS } from '../actions/spotify'

const intialState = []

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return action.searchResults
    default:
      return state
  }
}

export default reducer
