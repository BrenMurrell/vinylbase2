
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: '1', display_name: 'brentest', photo_url: '' },
        { id: '2', display_name: 'timmy-tester', photo_url: '' },
        { id: '3', display_name: 'davidg', photo_url: '' }
      ])
    })
}

/*
t.string('uid').primary()
t.string('displayName')
t.string('photoURL')
t.string('userName') */
