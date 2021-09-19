const express = require('express');
const validate = require('express-validation');
const validator = require('./validation');
const controller = require('./controller');

const authenticator = require('../../services/authenticator');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(
    authenticator.authenticate,
    validate(validator.listUsers),
    controller.listUsers,
  )
  .post(
    authenticator.authenticate,
    validate(validator.createUser),
    controller.createUser,
  );

router.route('/search')
  .post(
    authenticator.authenticate,
    validate(validator.searchUsers),
    controller.searchUsers,
  );

router.route('/authenticate')
  .post(
    authenticator.authenticate,
    validate(validator.authenticateUser),
    controller.authenticateUser,
  );

router.route('/:userId/username')
  .put(
    authenticator.authenticate,
    validate(validator.updateUsername),
    controller.updateUsername,
  );

router.route('/:userId/password')
  .put(
    authenticator.authenticate,
    validate(validator.updatePassword),
    controller.updatePassword,
  );

router.route('/:userId')
  .get(
    authenticator.authenticate,
    validate(validator.getUser),
    controller.getUser,
  )
  .delete(
    authenticator.authenticate,
    validate(validator.deleteUser),
    controller.deleteUser,
  );

module.exports = router;
