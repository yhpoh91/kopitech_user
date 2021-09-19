const express = require('express');
const validate = require('express-validation');
const validator = require('./validation');
const controller = require('./controller');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(
    validate(validator.listUsers),
    controller.listUsers,
  )
  .post(
    validate(validator.createUser),
    controller.createUser,
  );

router.route('/search')
  .post(
    validate(validator.searchUsers),
    controller.searchUsers,
  );

router.route('/authenticate')
  .post(
    validate(validator.authenticateUser),
    controller.authenticateUser,
  );

router.route('/:userId/username')
  .put(
    validate(validator.updateUsername),
    controller.updateUsername,
  );

router.route('/:userId/password')
  .put(
    validate(validator.updatePassword),
    controller.updatePassword,
  );

router.route('/:userId')
  .get(
    validate(validator.getUser),
    controller.getUser,
  )
  .delete(
    validate(validator.deleteUser),
    controller.deleteUser,
  );

module.exports = router;
