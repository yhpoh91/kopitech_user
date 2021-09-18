const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const encode = async (payload) => {
  try {
    const token = await jsonwebtoken.sign(payload, secret);
    return Promise.resolve(token);
  } catch (error) {
    return Promise.reject(error);
  }
};

const decode = async (token, verify = true) => {
  try {
    let payload;
    if (!verify) {
      payload = await jsonwebtoken.decode(token);
    } else {
      payload = await jsonwebtoken.verify(token, secret);
    }

    return Promise.resolve(payload);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  encode,
  decode,
};
