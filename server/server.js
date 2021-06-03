const path = require('path')
const express = require('express')
const server = express()
// const session = require('express-session')
const cookieParser = require('cookie-parser')
// MIDDLEWARE
server.use(cookieParser())
server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({ extended: true }))

// ROUTES

const albumRoutes = require('./routes/albumRoutes')
const artistRoutes = require('./routes/artistRoutes')
const spotifyRoutes = require('./routes/spotifyRoutes')
const userRoutes = require('./routes/userRoutes')
const userAlbumsRoutes = require('./routes/userAlbumsRoutes')

server.use('/api/v1/albums', albumRoutes)
server.use('/api/v1/artists', artistRoutes)
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/user-albums', userAlbumsRoutes)
server.use('/api/v1/spotify', spotifyRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

module.exports = server
