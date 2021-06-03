import { getUserAlbums, createUserAlbum } from '../api/users'

export const SET_USER_ALBUMS = 'SET_USER_ALBUMS'
export const ADD_NEW_ALBUM = 'ADD_NEW_ALBUM'

const setUserAlbums = (userAlbums) => {
  return {
    type: SET_USER_ALBUMS,
    userAlbums
  }
}

export const fetchUserAlbums = (userId) => {
  return dispatch => {
    return getUserAlbums(userId)
      .then(userAlbums => {
        return dispatch(setUserAlbums(userAlbums.body))
      })
  }
}

const setNewUserAlbum = (newUserAlbum) => {
  console.log(newUserAlbum)
  return {
    type: ADD_NEW_ALBUM,
    newUserAlbum
  }
}

export const addUserAlbum = (album, userId) => {
  return dispatch => {
    return createUserAlbum(album, userId)
      .then(newUserAlbum => {
        return dispatch(setNewUserAlbum(newUserAlbum.body))
      })
  }
}
