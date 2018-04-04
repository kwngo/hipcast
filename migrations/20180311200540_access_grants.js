exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('access_grants', function(table) {
    table.increments();
    table.string('token').notNullable();
    table.boolean('active').defaultTo(true).notNullable();
    table.bigInteger('user_id').references('id').inTable('users').notNullable();
    table.timestamps(true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('access_grants')
  ])
  
};
