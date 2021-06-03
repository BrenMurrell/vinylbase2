/* eslint-disable promise/no-nesting */
const express = require('express')
const router = express.Router()

const dbAlbums = require('../db/albumFuncs')
const dbUserAlbums = require('../db/userAlbumFuncs')

router.post('/', (req, res) => {
  const newAlbum = req.body.album
  const userId = req.body.userId
  // return res.json({ newAlbum, userId })
  // return dbAlbums.getAlbumBySid(newAlbum.id)
  return dbAlbums.getAlbumBySid('468ZwCchVtzEbt9BHmXopb')
    .then(album => {
      if (!album) {
        // return res.json({ album: null })
        const newAlbumObj = {
          sid: newAlbum.id,
          artistID: newAlbum.artists[0].id,
          albumArt: newAlbum.images[0].url,
          name: newAlbum.name
        }
        return dbAlbums.addAlbum(newAlbumObj)
          .then(() => {
            const userAlbumData = {
              uid: userId,
              sid: newAlbumObj.sid
            }
            return dbUserAlbums.addUserAlbum(userAlbumData)
              .then(() => {
                newAlbumObj.uid = userId
                return res.json(newAlbumObj)
              })
          })
      }
      return res.json(album)
    })
})

module.exports = router
