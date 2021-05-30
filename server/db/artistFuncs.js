const knex = require('knex')
const config = require('./knexfile')
const env = process.env.NODE_ENV || 'development'

const connection = knex(config[env])

const getArtistBySid = (sid, db = connection) => {
  return db('artists')
    .where('sid', sid)
    .first()
}

const getArtistsAll = (orderField = 'name', db = connection) => {
  return db('artists')
    .select()
    .orderBy(orderField)
}

const addArtist = (artist, db = connection) => {
  return db('artists')
    .insert(artist)
}


const updateArtist = (sid, data, db = connection) => {
  return db('artists')
    .update(data)
    .where('sid', sid)
}

const deleteArtist = (sid, db = connection) => {
  return db('artists')
    .delete()
    .where('sid', sid)
}

module.exports = {
  addArtist,
  deleteArtist,
  getArtistBySid,
  getArtistsAll,
  updateArtist
}