const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');

const knex = Knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: process.env.DATABASE_URL
});

Model.knex(knex)

module.exports = {
  'knex': knex,
  'Model': Model
}


