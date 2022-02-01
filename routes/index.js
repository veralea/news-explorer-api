const express = require('express');
const userRouter = require('./users');
const articleRouter = require('./articles');
const NotFoundError = require('../errors/not-found-err');

const router = express.Router();
router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.get('*', (req, res, next) => {
  const error = new NotFoundError('Requested resource not found');
  next(error);
});

module.exports = router;