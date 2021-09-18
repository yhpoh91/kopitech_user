const { v4: uuid } = require('uuid');
const { Op } = require('sequelize');

const { User } = require('./database');
const hashService = require('./hash');
const { L } = require('./logger')('User Service');


const mapUser = (rawUser, removeSensitive = true) => {
  if (rawUser == null) {
    return null;
  }

  const user = rawUser.dataValues;

  if (removeSensitive) {
    delete user.passwordHash;
    delete user.passwordSalt;
  }
  return user;
};



const listUsers = async (criteria, limit = 30, offset = 0, excludeDeleted = true, removeSensitive = true) => {
  try {
    const { userIds, username } = criteria;

    const query = {
      where: {},
      limit,
      offset,
    };

    if (userIds) {
      query.where.id = userIds;
    }

    if (username) {
      query.where.username = username;
    }

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const rawUsers = await User.findAll(query);
    const mappedUsers = (rawUsers || []).map(rawuser => mapUser(rawUser, removeSensitive));
    return Promise.resolve(mappedUsers);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUser = async (userId, excludeDeleted = true, removeSensitive = true) => {
  try {
    const query = {
      where: {
        id: userId,
      },
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const rawUser = await User.findOne(query);
    const mappedUser = mapUser(rawUser, removeSensitive);
    return Promise.resolve(mappedUser);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createUser = async (username, password) => {
  try {
    const passwordSalt = await hashService.generateSalt();
    const passwordHash = await hashService.hash(password, passwordSalt);

    const rawUser = await User.create({
      id: uuid(),
      username,
      passwordHash,
      passwordSalt,
      deleted: 0,
    });

    const mappedUser = mapUser(rawUser, true);
    return Promise.resolve(mappedUser);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateUsername = async (userId, requestedChanges, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: profileId,
      },
      fields: [],
      returning: true,
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = {};

    if (requestedChanges.username != null) {
      changes.username = requestedChanges.username || null;
      query.fields.push('username');
    }

    const updateResult = await User.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const updatePassword = async (userId, requestedChanges, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: profileId,
      },
      fields: [],
      returning: true,
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = {};

    if (requestedChanges.password != null) {
      const passwordSalt = await hashService.generateSalt();
      const passwordHash = await hashService.hash(requestedChanges.password, passwordSalt);

      changes.passwordHash = passwordHash;
      changes.passwordSalt = passwordSalt;
      query.fields.push('passwordHash');
      query.fields.push('passwordSalt');
    }

    const updateResult = await User.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const deleteUser = async (userId, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: userId,
      },
      returning: true,
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = {
      deleted: Math.floor(new Date().getTime() / 1000),
    }

    const updateResult = await User.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  listUsers,
  createUser,
  getUser,
  updateUsername,
  updatePassword,
  deleteUser,
};
