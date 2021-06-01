const express = require('express')
const router = express.Router()

const db = require('../db/albumFuncs')

router.get('/', (req, res) => {
  return db.getAlbumsAll()
    .then(albums => {
      res.json(albums)
    })
})

//TODO: complete patch route (write tests)
router.post('/', (req, res) => {
  const newAlbum = req.body
  return db.addAlbum(newAlbum)
    .then(() => {
      return db.getAlbumBySid(req.body.sid)
        .then(album => {
          res.status(201).json(album)
        })
    })
    .catch(err => {
      console.log('Error: ', err.message)
      
      res.status(500).json('Error! - Album could not be created')
    })
})

router.get('/:sid', (req, res) => {
  return db.getAlbumBySid(req.params.sid)
    .then(album => {
      res.json(album)
    })
})

//TODO: complete patch route (write tests)
router.patch('/:sid', (req, res) => {
  const sid = req.params.sid
  return db.updateAlbum(sid, req.body)
    .then(() => {
      return db.getAlbumBySid(sid)
        .then(album => {
          res.json(album)
        })
    })
})

router.delete('/:sid', (req, res) => {
  const sid = req.params.sid
  return db.deleteAlbum(sid)
    .then(() => {
      res.json('ok')
    })
})


module.exports = router