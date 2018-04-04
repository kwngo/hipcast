const Joi = require('joi');

const EpisodeSchema = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  length: Joi.number().integer().required(),
  url: Joi.string().uri().required(),
  podcast_id: Joi.number().integer().required()
}

module.exports = {
  EpisodeSchema
}
