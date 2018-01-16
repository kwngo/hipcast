exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('episodes', function (table) {
        table.increments();
        table.string('title').notNullable();
	table.text('description').notNullable();
	table.bigInteger('length');
	table.string('url').notNullable();
	table.bigInteger('podcast_id').references('id').inTable('podcasts').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('episodes')
  ])
};
