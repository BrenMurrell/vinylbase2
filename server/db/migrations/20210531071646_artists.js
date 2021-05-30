exports.up = (knex) => {
  return knex.schema.createTable('artists', (t) => {
    t.string('sid').primary()
    t.string('image')
    t.string('name')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('artists')
}
