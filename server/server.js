const express = require('express')
const server = express()
// const session = require('express-session')
const cookieParser = require('cookie-parser');
// MIDDLEWARE
server.use(cookieParser());
server.use(express.json())
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

// ROUTES
const spotifyUtils = require('./routes/spotify')

const albumRoutes = require('./routes/albumRoutes')
const artistRoutes = require('./routes/artistRoutes')
const spotifyRoutes = require('./routes/spotifyRoutes')
const userRoutes = require('./routes/userRoutes')

server.use('/spotify', spotifyUtils)

server.use('/api/v1/albums', albumRoutes)
server.use('/api/v1/artists', artistRoutes)
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/spotify', spotifyRoutes)

server.get('/', (req,res) => {
  res.send('Home route')
})

server.get('/about', (req,res) => {
  res.send('about route')
})

module.exports = server
