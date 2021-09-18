const express = require('express');

const userRouter = require('./user');

const { L } = require('../services/logger')('Global Router');

const router = express.Router({ mergeParams: true });

router.get('/', (_, res) => res.send('Server is online'));
router.use('/users', userRouter);


module.exports = router;
