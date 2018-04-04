const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const AccessGrant = require('../../api/accessGrants/model');
const User = require('../../api/users/model');
const Podcast = require('../../api/podcasts/model');
const server = require('../testServer');
const uuidV4 = require('uuid/v4');

let should = chai.should();

chai.use(chaiHttp);

describe('subscriptions', () => {
  describe('POST /subscriptions', () => {
    it ('should create a subscription', async() => {
      let user = await User.query().insert({email: 'test@example.com', password_digest: 'test123'})
      let token = uuidV4();
      let accessGrant = await AccessGrant.query().insert({token: token, user_id:user.id})
      let podcast = await Podcast.query().insert({title: 'This is a sample podcast', description: 'description'})
      let res = await chai
        .request(server)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + accessGrant.token)
        .send({user_id: user.id, podcast_id: podcast.id})
      res.should.have.status(200);
      res.body.user_id.should.eq(user.id)
      res.body.podcast_id.should.eq(podcast.id)
    });
  });
});
