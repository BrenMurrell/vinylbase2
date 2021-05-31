const express = require('express')

const server = express()


server.use(express.json())

// MIDDLEWARE
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

const spotifyRoutes = require('./routes/spotify')
const albumRoutes = require('./routes/albumRoutes')


server.use('/spotify', spotifyRoutes)
server.use('/api/v1/albums', albumRoutes
)
// ROUTES
server.get('/', (req,res) => {
  res.send('Home route')
})

server.get('/about', (req,res) => {
  res.send('about route')
})

module.exports = server
