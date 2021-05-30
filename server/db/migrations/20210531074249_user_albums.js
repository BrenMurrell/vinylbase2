exports.up = (knex) => {
  return knex.schema.createTable('user_albums', (t) => {
    t.increments('id').primary()
    t.string('sid')
    t.string('uid')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('user_albums')
}
