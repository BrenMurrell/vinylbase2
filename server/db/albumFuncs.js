const knex = require('knex')
const config = require('./knexfile')
const env = process.env.NODE_ENV || 'development'

const connection = knex(config[env])

const getAlbumBySid = (sid, db = connection) => {
  return db('albums')
    .where('sid', sid)
    .first()
}

const getAlbumsAll = (orderField = 'name', db = connection) => {
  return db('albums')
    .select()
    .orderBy(orderField)
}

const addAlbum = (album, db = connection) => {
  return db('albums')
    .insert(album)
}


const updateAlbum = (sid, data, db = connection) => {
  return db('albums')
    .update(data)
    .where('sid', sid)
}

const deleteAlbum = (sid, db = connection) => {
  return db('albums')
    .delete()
    .where('sid', sid)
}

module.exports = {
  addAlbum,
  deleteAlbum,
  getAlbumBySid,
  getAlbumsAll,
  updateAlbum
}