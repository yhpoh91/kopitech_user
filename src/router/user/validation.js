const joi = require('joi');

module.exports = {
  listUsers: {
    query: {
      limit: joi.number().default(30).optional(),
      offset: joi.number().default(0).optional(),
    },
    params: {},
    body: {},
  },
  searchUsers: {
    query: {},
    params: {},
    body: {
      limit: joi.number().default(30).optional(),
      offset: joi.number().default(0).optional(),


      criteria: joi.object({
        userIds: joi.array().items(joi.string()).optional(),
        username: joi.string().optional(),
      }).default({}).optional(),
    },
  },
  createUser: {
    query: {},
    params: {},
    body: {
      username: joi.string().required(),
      password: joi.string().min(6).required(),
      passwordConfirm: joi.any().valid(joi.ref('password')).required().options({
        language: {
          any: {
            allowOnly: 'must match password',
          },
        },
      }),
    },
  },
  getUser: {
    query: {},
    params: {
      userId: joi.string().required(),
    },
    body: {},
  },
  updateUsername: {
    query: {},
    params: {
      userId: joi.string().required(),
    },
    body: {
      username: joi.string().required(),
    },
  },
  updatePassword: {
    query: {},
    params: {
      userId: joi.string().required(),
    },
    body: {
      password: joi.string().min(6).required(),
      passwordConfirm: joi.any().valid(joi.ref('password')).required().options({
        language: {
          any: {
            allowOnly: 'must match password',
          },
        },
      }),
    },
  },
  deleteUser: {
    query: {},
    params: {
      userId: joi.string().required(),
    },
    body: {},
  },
};
