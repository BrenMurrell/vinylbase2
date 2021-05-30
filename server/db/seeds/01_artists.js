
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('artists').del()
    .then(() => {
      // Inserts seed entries
      return knex('artists').insert([
        {sid: '0k17h0D3J5VfsdmQ1iZtE9', name: 'Pink Floyd', image: 'https://i.scdn.co/image/e69f71e2be4b67b82af90fb8e9d805715e0684fa'},
        {sid: '7DjwIxbe8kpw4pqnzAMoin', name: 'The Beths', image: 'https://i.scdn.co/image/80504aad6550f4a77f6eb36e183a9577e2797c2c' },
        {sid: '0WwSkZ7LtFUFjGjMZBMt6T', name: 'Dire Straits', image: 'https://i.scdn.co/image/54a86ecf1de16b17e2ed000a9ca8a1590c9a3b80'}
      ]);
    });
};
