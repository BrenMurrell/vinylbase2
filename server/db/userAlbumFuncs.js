const knex = require('knex')
const config = require('./knexfile')
const env = process.env.NODE_ENV || 'development'

const connection = knex(config[env])

const getUserAlbumsByUid = (uid, db = connection) => {
  return db('user_albums')
    .where('uid', uid)
    .join('albums', 'albums.sid', 'user_albums.sid')
}

const addUserAlbum = (userAlbums, db = connection) => {
  return db('user_albums')
    .insert(userAlbums)
}

const deleteUserAlbum = (id, db = connection) => {
  return db('user_albums')
    .delete()
    .where('id', id)
}

module.exports = {
  getUserAlbumsByUid,
  addUserAlbum,
  deleteUserAlbum
}
