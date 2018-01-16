const router = require('koa-router')();
const Podcast = require('./model');
const schema = require('./schema');
const PodcastSchema = schema.PodcastSchema;
const Joi = require('joi');

router.get('/podcasts', async(ctx, next) => {
  let response = await Podcast.query();
  ctx.body = response;
});

router.post('/podcastss', async (ctx, next) => {
  const { body } = ctx.request;
  var {error, value} = Joi.validate(body, PodcastSchema);
  if (error) {
    console.error(error);
    ctx.throw(400);
  }

  let podcast = {title: body.name, description: body.description, website: body.website, author: body.author, thumbnail: body.thumbnail}

  try {
    let response = await Podcast.query().insert(space)
    ctx.body = response;
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  }
});

router.put('/podcasts/:id', async (ctx, next) => {
  const { body } = ctx.request;
  var {error, value} = Joi.validate(body, PodcastSchema);
  if (error) {
    console.error(error);
    ctx.throw(400);
  };

	let podcast = {title: body.name, description: 		body.description, website: body.website, author: body.author, thumbnail: body.thumbnail}

  try {
    response = await Podcast.query().patchAndFetchById(ctx.params.id, space);
    ctx.body = response;
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  };

});

router.delete('/podcasts/:id', async (ctx, next) => {
  try {
    response = await Podcast.query().deleteById(ctx.params.id);
    ctx.body = response;
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  };

});

module.exports = router;
