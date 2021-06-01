const express = require('express')
const router = express.Router()

const db = require('../db/userFuncs')

  // t.string('id').primary()
  // t.string('display_name')
  // t.string('photo_url')
  // t.string('spotify_url')
  // t.string('spotify_api_url')
  // t.string('email')

router.post('/', (req, res) => {
  const spotifyUser = req.body 
  return db.getUserByUid(spotifyUser.id)
    .then(user => {
      if (user) {
        res.json({ 'err': 'User already exists' })
      } else {
        const newUser = {
          id: spotifyUser.id,
          display_name: spotifyUser.display_name,
          photo_url: spotifyUser.images[0].url,
          spotify_url: spotifyUser.external_urls.spotify,
          spotify_api_url: spotifyUser.href,
          email: spotifyUser.email
        }
        return db.addUser(newUser)
          .then(() => {
            return db.getUserByUid(newUser.id)
              .then(user => {
                res.json(user)
              })
          })
      }

    })
})

module.exports = router