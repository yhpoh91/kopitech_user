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
