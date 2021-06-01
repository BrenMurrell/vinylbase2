const express = require('express')
const router = express.Router()

const db = require('../db/artistFuncs')

router.get('/', (req, res) => {
  return db.getArtistsAll()
    .then(artists => {
      res.json(artists)
    })
})

router.get('/:sid', (req, res) => {
  const sid = req.params.sid
  return db.getArtistBySid(sid)
    .then(artist => {
      res.json(artist)
    })
})

module.exports = router