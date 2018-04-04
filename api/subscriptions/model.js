const Base = require('../base');


class Subscription extends Base {
  static get tableName() {
    return 'subscriptions';
  }
}

module.exports = Subscription;
