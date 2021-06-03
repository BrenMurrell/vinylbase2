/* eslint-disable jest/no-commented-out-tests */
const dbFuncs = require('./userAlbumFuncs')
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

describe('User album tests', () => {
  // describe('CREATE tests', () => {
  //   test('can create a new user', () => {
  //     const newUser = {
  //       uid: '4',
  //       displayName: 'davidg',
  //       photoURL: '',
  //       userName: 'Dave Gilmour'
  //     }

  //     const expected = newUser.displayName

  //     return dbFuncs.addUser(newUser, testDb)
  //       .then(() => {
  //         return dbFuncs.getUserByUid(newUser.uid, testDb)
  //           .then(user => {
  //             const actual = user.displayName
  //             expect(actual).toEqual(expected)
  //           })
  //     })
  //   })
  // })

  describe('READ tests', () => {
    test('select albums for a user by id (uid)', () => {
      const userUid = 'brenmurrell'
      const expected = 3
      return dbFuncs.getUserAlbumsByUid(userUid, testDb)
        .then(albums => {
          const actual = albums.length
          return expect(actual).toEqual(expected)
        })
    })
  })

  // describe('UPDATE tests', () => {
  //   test('can update a user using uid', () => {
  //     const expected = 'NewName'
  //     const userUid = '2'
  //     const data = { displayName: expected }
  //     return dbFuncs.updateUser(userUid, data, testDb)
  //       .then(() => {
  //         return dbFuncs.getUserByUid(userUid, testDb)
  //           .then(user => {
  //             const actual = user.displayName
  //             expect(actual).toEqual(expected)
  //           })
  //       })
  //   })
  // })
  // describe('DELETE tests', () => {
  //   test('can delete a user using uid', () => {

  //     const uid = '2'

  //     return dbFuncs.deleteUser(uid, testDb)
  //       .then(() => {
  //         return dbFuncs.getUserByUid(uid, testDb)
  //           .then(user => {
  //             expect(user).toBeFalsy()
  //           })
  //       })
  //   })
  // })
})
