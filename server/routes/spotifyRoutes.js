/* eslint-disable promise/no-nesting */
const express = require('express')
const router = express.Router()
const userDb = require('../db/userFuncs')

const request = require('superagent')

const baseUrl = 'https://api.spotify.com/v1'

router.get('/search', (req, res) => {
  const url = `${baseUrl}/search?q=${req.query.q}&type=${req.query.type}`
  request.get(url)
    .set('Authorization', `Bearer ${req.query.access_token}`)
    .end((err, data) => {
      if (err) {
        console.log('Error', err.message, 'body', data.body)
        return res.json(data.body)
      }
      res.json(data.body)
    })
})

router.get('/me', (req, res) => {
  request.get('https://api.spotify.com/v1/me')
    .set('Authorization', `Bearer ${req.query.access_token}`)
    .end((err, user) => {
      if (err) {
        console.log(err.message, user.error.text)
        return res.status(500).json({ error: 'Something went wrong' })
      }
      const spotifyUser = JSON.parse(user.text)

      const newUser = {
        id: spotifyUser.id,
        display_name: spotifyUser.display_name,
        photo_url: spotifyUser.images[0].url,
        spotify_url: spotifyUser.external_urls.spotify,
        spotify_api_url: spotifyUser.href,
        email: spotifyUser.email
      }
      return userDb.getUserByUid(newUser.id)
        .then(existingUser => {
          if (existingUser) {
            return res.json(existingUser)
          } else {
            return userDb.addUser(newUser)
              .then(() => {
                return userDb.getUserByUid(newUser.id)
                  .then(createdUser => {
                    return res.json(createdUser)
                  })
              })
          }
        })
    })
})

router.get('/appToken', (req, res) => {
  return res.json(process.env.spotify_id)
})

router.get('/userTokens', (req, res) => {
  const authCode = req.query.code
  request.post('https://accounts.spotify.com/api/token')
    .send({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: `http://${process.env.HOST}:${process.env.PORT}/callback`
    })
    .set('Authorization', `Basic ${process.env.spotify_base64}`)
    .type('form')
    .end((err, data) => {
      if (err) {
        return res.json(err)
      }
      return res.json(data)
    })
})

router.get('/refresh-token', (req, res) => {
  const refreshToken = req.query.refreshToken
  request.post('https://accounts.spotify.com/api/token')
    .send({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
    .set('Authorization', `Basic ${process.env.spotify_base64}`)
    .type('form')
    .end((err, data) => {
      if (err) {
        return res.json(err)
      }
      return res.json(data.body)
    })
})

module.exports = router
