var mocha = require('mocha');
var knexCleaner = require('knex-cleaner');
const db = require('../db');


after(async() => {
  await knexCleaner.clean(db.knex);
});
