const express = require('express')
const server = express()
// const session = require('express-session')
const cookieParser = require('cookie-parser');
// MIDDLEWARE
server.use(cookieParser());
server.use(express.json())
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

// server.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

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
