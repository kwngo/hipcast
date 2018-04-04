
const Base = require('../base');

class User extends Base {
  static get tableName() {
    return 'users';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        email: {type: 'string'}
      }
    }

  }
}

module.exports = User;
