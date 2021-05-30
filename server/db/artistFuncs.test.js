const dbFuncs = require('./artistFuncs')
const knex = require('knex')
const config = require('./knexfile')
const env = process.env.NODE_ENV
const testDb = knex(config[env])

beforeAll(() => {
})

beforeEach(() => {
  return testDb.migrate.latest()
    .then(() => {
      return testDb.seed.run()
    })
})




describe('Artist tests', () => {
  describe('CREATE tests', () => {
    test('can create a new artist', () => {
      const newArtist = {
        sid: '36QJpDe2go2KgaRleHCDTp',
        name: 'Led Zeppelin',
        image: 'https://i.scdn.co/image/207803ce008388d3427a685254f9de6a8f61dc2e'
      }
      const expected = newArtist.name

      return dbFuncs.addArtist(newArtist, testDb)
        .then(() => {
          return dbFuncs.getArtistBySid(newArtist.sid, testDb)
            .then(artist => {
              const actual = artist.name
              expect(actual).toEqual(expected)
            })
      })
    })
  })

  describe('READ tests', () => {

    test('select all artists', () => {
      const expected = 3
      return dbFuncs.getArtistsAll('name', testDb)
        .then(artists => {
          const actual = artists.length
          expect(actual).toEqual(expected)
        })
    })

    test('select a single artist by spotify id (sid)', () => {
      const expected = 'Pink Floyd'
      const artistSid = '0k17h0D3J5VfsdmQ1iZtE9'
      return dbFuncs.getArtistBySid(artistSid, testDb)
        .then(artist => {
          const actual = artist.name
          expect(actual).toEqual(expected)
        })
    })
  })

  describe('UPDATE tests', () => {
    test('can update and artist using sid', () => {
      const expected = 'Floyd Pink'
      const artistSid = '0k17h0D3J5VfsdmQ1iZtE9'
      const data = { name: 'Floyd Pink' }
      return dbFuncs.updateArtist(artistSid, data, testDb)
        .then(() => {
          return dbFuncs.getArtistBySid(artistSid, testDb)
            .then(artist => {
              const actual = artist.name
              expect(actual).toEqual(expected)
            })
        })
    })
    
  })
  describe('DELETE tests', () => {
    test('can delete an artist using sid', () => {

      const sid = '0k17h0D3J5VfsdmQ1iZtE9'

      return dbFuncs.deleteArtist(sid, testDb)
        .then(() => {
          return dbFuncs.getArtistBySid(sid, testDb)
            .then(artist => {
              expect(artist).toBeFalsy()
            })
        })
    })
  })
})