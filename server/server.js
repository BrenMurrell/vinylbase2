const express = require('express')

const server = express()

// MIDDLEWARE
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

const spotifyRoutes = require('./routes/spotify')


server.use('/spotify', spotifyRoutes)

// ROUTES
server.get('/', (req,res) => {
  res.send('Home route')
})

server.get('/about', (req,res) => {
  res.send('about route')
})

module.exports = server
