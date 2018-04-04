const Base = require('../base');
const Model = require('objection').Model;

class Episodes extends Base {
  static get tableName() {
    return 'episodes';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: {type: 'integer'},
        title: {type: 'string'},
        description: {type: 'string'},
        length: {type: 'string'},
        url: {type: 'string'},
        podcastId: {type: 'string'}
      }
    }
  }
}
