const router = require('koa-router')();
const Podcast = require('./model');
const api = require('koa-router-version');
const schema = require('./schema');
const PodcastSchema = schema.PodcastSchema;
const Joi = require('joi');

router.get('podcasts.list', '/podcasts', api.version({'1.0.0': async(ctx, next) => {
  let response = await Podcast.query();
  ctx.body = response;
}}));

router.post('podcasts.create', '/podcasts', api.version({'1.0.0': async (ctx, next) => {
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
}}));

router.put('podcasts.update', '/podcasts/:id', api.version({'1.0.0': async (ctx, next) => {
  const { body } = ctx.request;
  var {error, value} = Joi.validate(body, PodcastSchema);
  if (error) {
    console.error(error);
    ctx.throw(400);
  };

  let podcast = {title: body.name, description: body.description, website: body.website, author: body.author, thumbnail: body.thumbnail}

  try {
    response = await Podcast.query().patchAndFetchById(ctx.params.id, space);
    ctx.body = response;
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  };

}}));

router.delete('podcasts.delete', '/podcasts/:id', api.version({'1.0.0': async (ctx, next) => {
  try {
    response = await Podcast.query().deleteById(ctx.params.id);
    ctx.body = response;
  } catch(err) {
    console.error(err);
    ctx.throw(422);
  };

}}));

module.exports = router;
