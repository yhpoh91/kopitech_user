const express = require('express');
const validate = require('express-validation');
const validator = require('./validation');
const controller = require('./controller');

const router = express.Router({ mergeParams: true });

router.route('/login')
  .get(
    validate(validator.login),
    controller.login,
  );

module.exports = router;
