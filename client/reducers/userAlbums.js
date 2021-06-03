import { SET_USER_ALBUMS, ADD_NEW_ALBUM } from '../actions/users'

const intialState = []

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_USER_ALBUMS:
      return action.userAlbums
    case ADD_NEW_ALBUM:
      return [action.newUserAlbum, ...state]
    default:
      return state
  }
}

export default reducer
