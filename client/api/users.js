const request = require('superagent')

const baseUrl = '/api/v1/users'

export const getUserAlbums = (userId) => {
  return request.get(`${baseUrl}/${userId}/albums`)
    .then(userAlbums => {
      return userAlbums
    })
}

export const createUserAlbum = (album, userId) => {
  return request.post(`${baseUrl}/add-album`)
    .send({ album, userId })
    .then(newAlbum => {
      // need this to return new user_album data
      return newAlbum
    })
}
