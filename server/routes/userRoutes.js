/* eslint-disable promise/no-nesting */
const express = require('express')
const router = express.Router()

const dbUsers = require('../db/userFuncs')
const dbUserAlbums = require('../db/userAlbumFuncs')
const dbAlbums = require('../db/albumFuncs')

router.get('/', (req, res) => {
  return dbUsers.getUsersAll()
    .then(users => {
      return res.json(users)
    })
    .catch(e => {
      console.log(e.message)
      res.status(500).send('something went wrong :(')
    })
})

router.get('/:id/albums', (req, res) => {
  return dbUserAlbums.getUserAlbumsByUid(req.params.id)
    .then(albums => {
      return res.json(albums)
    })
})

router.post('/', (req, res) => {
  const spotifyUser = req.body
  return dbUsers.getUserByUid(spotifyUser.id)
    .then(user => {
      if (user) {
        return res.json({ err: 'User already exists' })
      } else {
        const newUser = {
          id: spotifyUser.id,
          display_name: spotifyUser.display_name,
          photo_url: spotifyUser.images[0].url,
          spotify_url: spotifyUser.external_urls.spotify,
          spotify_api_url: spotifyUser.href,
          email: spotifyUser.email
        }
        return dbUsers.addUser(newUser)
          .then(() => {
            return dbUsers.getUserByUid(newUser.id)
              .then(user => {
                return res.json(user)
              })
          })
      }
    })
    .error(err => {
      console.log(err.message)
    })
})

router.post('/add-album', (req, res) => {
  const newAlbum = req.body.album
  const userId = req.body.userId
  // return res.json({ newAlbum, userId })
  return dbAlbums.getAlbumBySid(newAlbum.id)
  // return dbAlbums.getAlbumBySid('468ZwCchVtzEbt9BHmXopb')
    .then(album => {
      const newAlbumObj = {
        sid: newAlbum.id,
        artistID: newAlbum.artists[0].id,
        albumArt: newAlbum.images[0].url,
        name: newAlbum.name
      }

      const userAlbumData = {
        uid: userId,
        sid: newAlbumObj.sid
      }

      if (!album) {
        // return res.json({ album: null })
        return dbAlbums.addAlbum(newAlbumObj)
          .then(() => {
            return dbUserAlbums.addUserAlbum(userAlbumData)
              .then(() => {
                newAlbumObj.uid = userId
                return res.json(newAlbumObj)
              })
          })
      } else {
        return dbUserAlbums.addUserAlbum(userAlbumData)
          .then(() => {
            newAlbumObj.uid = userId
            return res.json(newAlbumObj)
          })
      }

      // return res.json(album)
    })
})

module.exports = router
