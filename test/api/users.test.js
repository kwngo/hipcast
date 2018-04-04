const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiUUID = require('chai-uuid');
const mocha = require('mocha');
const server = require('../testServer');

let should = chai.should();

chai.use(chaiHttp);
chai.use(chaiUUID);

describe('users', () => {
  beforeEach(async(done) => {
    done();
  });

  describe('/POST users', () => {
    it('should create a user', async() => {
      let res = await chai
        .request(server)
        .post('/users')
        .send({email: 'test@example.com', password: 'abcde1234', password_confirmation: 'abcde1234'})
      res.should.have.status(200);
      res.body.should.have.property('user');
      res.body.user.should.have.property('email');
      res.body.user.email.should.eq('test@example.com');
      res.body.should.have.property('token');
      res.body.token.should.be.a.uuid();
    })
  });
});

