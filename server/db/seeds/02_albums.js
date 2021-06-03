exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('albums').del()
    .then(() => {
      // Inserts seed entries
      return knex('albums').insert([
        { sid: '468ZwCchVtzEbt9BHmXopb', artistID: '7DjwIxbe8kpw4pqnzAMoin', name: 'Echoes', albumArt: 'https://i.scdn.co/image/ab67616d0000b27356a920ebe6d25348c978e0ae' },
        { sid: '048KrxquURM9stY0MgH3kw', artistID: '0k17h0D3J5VfsdmQ1iZtE9', name: 'Jump Rope Gazers', albumArt: 'https://i.scdn.co/image/ab67616d0000b2736c8ef1d47facfa698e8a0640' },
        { sid: '3wvclpO3LJmpSQGQ9gBa2a', artistID: '0WwSkZ7LtFUFjGjMZBMt6T', name: 'Making Movies', albumArt: 'https://i.scdn.co/image/ab67616d0000b273d5b6cadaeec32b45bf0d7cf7' }
      ])
    })
}

/*
  t.string('sid').primary()
    t.string('artistID')
    t.string('albumArt')
    t.string('name')
    */
