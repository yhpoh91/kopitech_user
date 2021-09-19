const { L } = require('../../services/logger')('User Router');
const userService = require('../../services/user');

const listUsers = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const criteria = {};
    const users = await userService.listUsers(criteria, limit, offset, true, true);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const searchUsers = async (req, res, next) => {
  try {
    const { limit, offset, criteria } = req.body;
    const users = await userService.listUsers(criteria, limit, offset, true, true);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const criteria = { username };
    const users = await userService.listUsers(criteria, 30, 0, true, false);

    if (users == null) {
      L.error(`Null user list when login`);
      res.json({ authenticated: false });
      return;
    }

    if (users.length <= 0) {
      L.warn(`Empty user list when login`);
      res.json({ authenticated: false });
      return;
    }

    if (users.length > 1) {
      L.warn(`More than one active user with username "${username}!"`);
    }

    const user = users[0];
    const { id: userId, passwordHash: correctHash, passwordSalt } = user;

    // Try Hashing
    const testhash = await hashService.hash(password, passwordSalt);
    if (testhash !== correctHash) {
      L.info(`Password hash mismatched, login failed for username "${username}" [${userId}]`);
      res.json({ authenticated: false });
      return;
    }

    const safeUser = await userService.getUser(userId, true, true);
    res.json({ authenticated: true, user: safeUser });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await userService.createUser(username, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUser(userId, true, true);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUsername = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { username } = req.body;
    await userService.updateUsername(userId, { username }, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    await userService.updateUsername(userId, { password }, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await userService.deleteUser(userId, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listUsers,
  searchUsers,

  createUser,
  getUser,
  updateUsername,
  updatePassword,
  deleteUser,
};
