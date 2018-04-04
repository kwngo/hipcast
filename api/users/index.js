const router = require('koa-router')();
const User = require('./model');
const AccessGrant = require('../accessGrants/model');

const uuidV4 = require('uuid/v4');


router.post('/users', async(ctx) => {
  const { body } = ctx.request;
  if (body.password != body.password_confirmation) {
    ctx.throw(400);
  }
  let passwordDigest = body.password;
  let user = {email: body.email, password_digest: passwordDigest}
  try {
    let user_res = await User.query().insert(user);
    let token = uuidV4();
    let accessGrant = {token: token, user_id: user_res.id }
    let token_res = await AccessGrant.query().insert(accessGrant)
    ctx.body = {'user': user_res, 'token': token}
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  }
});


module.exports = router;

