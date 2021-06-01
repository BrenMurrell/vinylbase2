const knex = require('knex')
const config = require('./knexfile')
const env = process.env.NODE_ENV || 'development'

const connection = knex(config[env])

const getUserByUid = (uid, db = connection) => {
  return db('users')
    .where('id', uid)
    .first()
}

const getUsersAll = (db = connection) => {
  return db('users')
    .select()
}

const addUser = (user, db = connection) => {
  return db('users')
    .insert(user)
}


const updateUser = (uid, data, db = connection) => {
  return db('users')
    .update(data)
    .where('id', uid)
}

const deleteUser = (uid, db = connection) => {
  return db('users')
    .delete()
    .where('id', uid)
}

module.exports = {
  addUser,
  deleteUser,
  getUserByUid,
  getUsersAll,
  updateUser
}