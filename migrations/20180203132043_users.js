
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments();
      table.string('email').notNullable();
      table.string('password_digest').notNullable();
      table.timestamps(true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users')
  ])
};
