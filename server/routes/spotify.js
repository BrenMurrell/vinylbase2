const express = require('express')
const router = express.Router()

const userDb = require('../db/userFuncs')

const request = require('superagent')


const baseUrl = 'https://accounts.spotify.com'
const redirectUrl = encodeURIComponent('http://localhost:3000/spotify/response')

router.get('/', (req, res) => {
  console.log('Cookies: ', req.cookies)
  if(!req.cookies.name) {
    res.cookie('name', 'express').send('cookie set'); //Sets name = express
  } else {
    res.send('working')
  }
})

router.get('/auth', (req, res) => {
  // res.send(redirectUrl)
  const authUrl = `${baseUrl}/authorize/?client_id=${process.env.spotify_id}&response_type=code&redirect_uri=${redirectUrl}&scope=user-read-private%20user-read-email&state=34fFs29kd09&show_dialog=true`
  res.redirect(authUrl)
})

router.get('/response', (req, res) => {
  const authCode = req.query.code

  //now send this via post to https://accounts.spotify.com/api/token
  const tokenUrl = `${baseUrl}/api/token`

  request.post(tokenUrl)
    .send({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: 'http://localhost:3000/spotify/response'
    })
    .set('Authorization', `Basic ${process.env.spotify_base64}`)
    .type('form')
    .end((err, response) => {
      // console.log('err?', err)
      console.log(response.body)

      res.cookie('vb_access_token', response.body.access_token).cookie('vb_refresh_token', response.body.refresh_token).send('cookie set')

    })
})

router.get('/me', (req, res) => {
  console.log('Cookies: ', req.cookies.vb_access_token)

  request.get('https://api.spotify.com/v1/me')
    .set('Authorization', `Bearer ${req.cookies.vb_access_token}`)
    .end((err, user) => {
      const spotifyUser = JSON.parse(user.text)
      const newUser = {
        id: spotifyUser.id,
        display_name: spotifyUser.display_name,
        photo_url: spotifyUser.images[0].url,
        spotify_url: spotifyUser.external_urls.spotify,
        spotify_api_url: spotifyUser.href,
        email: spotifyUser.email
      }

      return userDb.addUser(newUser)
        .then(() => {
          return userDb.getUserByUid(newUser.id)
            .then(createdUser => {
              res.json(createdUser)
            })
        })
      // res.json(JSON.parse(user.text))

    })
})



module.exports = router

/* 
GET https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09

*/