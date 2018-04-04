const router = require('koa-router')();
const AccessGrant = require('./model');
const uuidV4 = require('uuid/v4');

router.post('/access_grants', async(ctx) => {
  const { body } = ctx.request;
  let token = uuidV4(); 
  let accessGrant = {token: token, user_id: 1}
  try {
    let response = await AccessGrant.query().insert(accessGrant)
    ctx.body = response;
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  }
});

module.exports = router;

