const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');

let DATABASE_URL = process.env.DATABASE_URL;

if (process.env.NODE_ENV == 'test'){
  DATABASE_URL = process.env.TEST_DATABASE_URL;
}


const knex = Knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: DATABASE_URL
});

Model.knex(knex)

module.exports = {
  'knex': knex,
  'Model': Model
}


