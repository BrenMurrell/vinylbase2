const express = require('express')
const router = express.Router()

const request = require('superagent')

const baseUrl = 'https://accounts.spotify.com/'

router.get('/auth', (req, res) => {
  const redirectUrl = encodeURIComponent('http://localhost:3000/spotify/response')
  // res.send(redirectUrl)
  const authUrl = `${baseUrl}authorize/?client_id=${process.env.spotify_id}&response_type=code&redirect_uri=${redirectUrl}&scope=user-read-private%20user-read-email&state=34fFs29kd09&show_dialog=true`
  res.redirect(authUrl)
  // return request(authUrl)
  //   .get()
  //   .then(response => {
  //     console.log(response)
  //   })
  //   .catch(err => {
  //     console.log('ooops', err.message)
  //   })
})

router.get('/response', (req, res) => {
  console.log(req.body)
  res.send(`<p>Code:</p><p>${req.query.code}</p>`)
})

module.exports = router

/* 
GET https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09

*/