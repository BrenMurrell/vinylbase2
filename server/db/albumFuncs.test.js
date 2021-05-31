const dbFuncs = require('./albumFuncs')
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


/* 
t.string('sid').primary()
t.string('artistID')
t.string('albumArt')
t.string('name')
*/

describe('Album tests', () => {
  describe('CREATE tests', () => {
    test('can create a new album', () => {
      const newAlbum = {
        sid: '468ZwCchVtzEbt9BHmXopb_test',
        artistID: '0k17h0D3J5VfsdmQ1iZtE9',
        name: 'Echoes_test',
        albumArt: 'https://i.scdn.co/image/ab67616d0000b27356a920ebe6d25348c978e0ae'
      }
      const expected = newAlbum.name

      return dbFuncs.addAlbum(newAlbum, testDb)
        .then(() => {
          return dbFuncs.getAlbumBySid(newAlbum.sid, testDb)
            .then(album => {
              const actual = album.name
              expect(actual).toEqual(expected)
            })
      })
    })
  })

  describe('READ tests', () => {

    test('select all albums', () => {
      const expected = 3
      return dbFuncs.getAlbumsAll('name', testDb)
        .then(albums => {
          const actual = albums.length
          expect(actual).toEqual(expected)
        })
    })

    test('select a single album by spotify id (sid)', () => {
      const expected = 'Echoes'
      const albumSid = '468ZwCchVtzEbt9BHmXopb'
      return dbFuncs.getAlbumBySid(albumSid, testDb)
        .then(album => {
          const actual = album.name
          expect(actual).toEqual(expected)
        })
    })
  })

  describe('UPDATE tests', () => {
    test('can update and album using sid', () => {
      const expected = 'Floyd Pink'
      const albumSid = '468ZwCchVtzEbt9BHmXopb'
      const data = { name: 'Floyd Pink' }
      return dbFuncs.updateAlbum(albumSid, data, testDb)
        .then(() => {
          return dbFuncs.getAlbumBySid(albumSid, testDb)
            .then(album => {
              const actual = album.name
              expect(actual).toEqual(expected)
            })
        })
    })
    
  })
  describe('DELETE tests', () => {
    test('can delete an album using sid', () => {

      const sid = '0k17h0D3J5VfsdmQ1iZtE9'

      return dbFuncs.deleteAlbum(sid, testDb)
        .then(() => {
          return dbFuncs.getAlbumBySid(sid, testDb)
            .then(album => {
              expect(album).toBeFalsy()
            })
        })
    })
  })
})