const Joi = require('joi');

const EpisodeSchema = {
  title: Joi.string().isRequired(),
  description: Joi.string().isRequired(),
  length: Joi.integer().isRequired(),
  url: Joi.string().uri().isRequired(),
  podcast_id: Joi.integer().isRequired()
}

module.exports = {
  EpisodeSchema
}
