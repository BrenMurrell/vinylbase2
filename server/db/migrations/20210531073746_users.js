exports.up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.string('id').primary()
    t.string('display_name')
    t.text('photo_url')
    t.string('spotify_url')
    t.string('spotify_api_url')
    t.string('email')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
