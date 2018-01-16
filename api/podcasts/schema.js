const Joi = require('joi');

const PodcastSchema = {
  title: Joi.string().alphanum().required(),
  description: Joi.string().alphanum(),
  author: Joi.string().alphanum(),
  thumbnail: Joi.string(),
  website: Joi.string()
}

module.exports = {
  PodcastSchema
}
