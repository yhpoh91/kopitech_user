const { L } = require('../../services/logger')('Auth Router');
const userService = require('../../services/user');
const hashService = require('../../services/hash');
const jwtService = require('../../services/jwt');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const criteria = { username };
    const users = await userService.listUsers(criteria, 30, 0, true, false);

    if (users == null) {
      L.error(`Null user list when login, should have been at least an empty list`);
      res.status(401).send(`Unauthorized`);
      return;
    }

    if (users.length <= 0) {
      res.status(401).send(`Unauthorized`);
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
      res.status(401).send(`Unauthorized`);
      return;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
