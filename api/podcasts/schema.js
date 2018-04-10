const Joi = require('joi');

const PodcastSchema = {
  title: Joi.string().required(),
  description: Joi.string(),
  author: Joi.string(),
  thumbnail: Joi.string(),
  website: Joi.string()
}

module.exports = {
  PodcastSchema
}
