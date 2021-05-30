exports.up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.string('uid').primary()
    t.string('displayName')
    t.string('photoURL')
    t.string('userName')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
