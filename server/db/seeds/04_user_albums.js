
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('user_albums').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_albums').insert([
        { id: 1, sid: '468ZwCchVtzEbt9BHmXopb', uid: 'brenmurrell' },
        { id: 2, sid: '048KrxquURM9stY0MgH3kw', uid: 'brenmurrell' },
        { id: 3, sid: '3wvclpO3LJmpSQGQ9gBa2a', uid: 'brenmurrell' },
        { id: 4, sid: '3wvclpO3LJmpSQGQ9gBa2a', uid: '3' },
        { id: 5, sid: '3wvclpO3LJmpSQGQ9gBa2a', uid: '1' }
      ])
    })
}
