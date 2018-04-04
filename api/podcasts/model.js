const Base = require('../base');

class Podcast extends Base {
  static get tableName() {
    return 'podcasts';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: {type: 'string'},
        title: {type: 'string'},
        description: {type: 'string'},
        website: {type: 'string'},
        author: {type: 'string'},
        thumbnail: {type: 'string'}
      }
    }
  }
};

module.exports = Podcast;
