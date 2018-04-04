const Base = require('../base');
const Model = require('objection').Model;

class AccessGrant extends Base {
  static get tableName() {
    return 'access_grants';
  }
  
  static get relationMappings() {
    const User = require('../users/model');
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'access_grants.user_id',
          to: 'users.id'
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        token: {type: 'string'},
        active: {type: 'boolean'}
      }
    }
  }
};

module.exports = AccessGrant;
