
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: '1', display_name: 'brentest', photo_url: '' },
        { id: '2', display_name: 'timmy-tester', photo_url: '' },
        { id: '3', display_name: 'davidg', photo_url: '' },
        {
          id: 'brenmurrell',
          display_name: 'Bren Murrell',
          photo_url: 'https://scontent-hkt1-1.xx.fbcdn.net/v/t1.6435-1/c89.195.1304.1304a/s320x320/158347101_10161040210886030_4581579484502990198_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=0c64ff&_nc_ohc=FP3rwNWmK20AX9ihVkO&_nc_ht=scontent-hkt1-1.xx&tp=28&oh=798b3a8a75cd8e831b9b85c1789cd531&oe=60DF6326',
          spotify_url: 'https://open.spotify.com/user/brenmurrell',
          spotify_api_url: 'https://api.spotify.com/v1/users/brenmurrell',
          email: 'spotify@moon.co.nz'
        }
      ])
    })
}

/*
t.string('uid').primary()
t.string('displayName')
t.string('photoURL')
t.string('userName') */
