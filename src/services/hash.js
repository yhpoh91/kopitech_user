const bcrypt = require('bcrypt');

const { L } = require('./logger')('Hash Service');


const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);

const generateSalt = async () => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return Promise.resolve(salt);
  } catch (error) {
    return Promise.reject(error);
  }
};

const hash = async (plaintext, salt) => {
  try {
    const hashResult = await bcrypt.hash(plaintext, salt);
    return Promise.resolve(hashResult);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  hash,
  generateSalt,
};
