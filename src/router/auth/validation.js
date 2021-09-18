const joi = require('joi');

module.exports = {
  login: {
    query: {},
    params: {},
    body: {
      username: joi.string().required(),
      password: joi.string().required(),
    },
  },
};
