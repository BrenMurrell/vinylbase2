
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {uid: '1', displayName: 'brenmurrell', photoURL: '', userName: 'Brenegade'},
        {uid: '2', displayName: 'timmy-tester', photoURL: '', userName: 'TimmyTester'},
        {uid: '3', displayName: 'davidg', photoURL: '', userName: 'Dave Gilmour'}
      ]);
    });
};

/* 

t.string('uid').primary()
t.string('displayName')
t.string('photoURL')
t.string('userName') */