
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('subscriptions', function(table) {
    table.increments();
    table.bigInteger('user_id').references('id').inTable('users').notNullable();
    table.bigInteger('podcast_id').references('id').inTable('podcasts').notNullable();
    table.timestamps(true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('subscriptions')
  ])
  
};
