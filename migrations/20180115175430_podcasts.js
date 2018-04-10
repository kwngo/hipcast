exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('podcasts', function (table) {
        table.increments();
        table.string('title');
        table.text('description');
        table.string('website');
        table.string('author');
        table.string('thumbnail');
        table.timestamps(true);
	table.bigInteger('user_id').references('id').inTable('users').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('podcasts')
  ])
};
