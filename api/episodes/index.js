const router = require('koa-router')();
const model = require('./model');
const Episode = model.Episode;
const schema = require('./schema');
const EpisodeSchema = schema.EpisodeSchema;
const Joi = require('joi');

router.get('/episodes', async(ctx, next) => {
  let response = await Episode.query();
  ctx.body = response;
});

router.post('/episodes', async(ctx, next) => {
  const { body } = ctx.request;
  var {error, value} = joi.validate(body, EpisodeSchema);
  if (error) { 
    console.error(error);
    ctx.throw(400);
  }

  let episode = {name: body.name, description: body.description, length: body.length, url: body.url, podcast_id: body.podcast_id }
  try {
    let response = await Episode.query().insert(episode)
    ctx.body = response;
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  }
});

router.put('/episodes/:id', async (ct, next) => {
  const { body } = ctx.request;
  var {error, value} = joi.validate(body, EpisodeSchema);
  if (error) { 
    console.error(error);
    ctx.throw(400);
  }

	let episode = {name: body.name, description: body.description, length: body.length, url: body.url, podcast_id: body.podcast_id }

  try {
    response = await Episode.query().patchAndFetchById(ctx.params.id, episode);
    ctx.body = response;
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  };


});

router.delete('/episodes/:id', async (ctx, next) => {
  try {
    response = await Episode.query().deleteById(ctx.params.id);
    ctx.body = response;
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  };
});

