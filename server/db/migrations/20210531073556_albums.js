exports.up = (knex) => {
  return knex.schema.createTable('albums', (t) => {
    t.string('sid').primary()
    t.string('artistID')
    t.string('albumArt')
    t.string('name')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('albums')
}
