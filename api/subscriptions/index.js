const router = require('koa-router')();
const Subscription = require('./model');

router.post('/subscriptions', async(ctx) => {
  const { body } = ctx.request;
  let subscription = { user_id: body.user_id, podcast_id: body.podcast_id }

  try {
    let response = await Subscription.query().insert(subscription)
    ctx.body = response;
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  }
});

module.exports = router;

