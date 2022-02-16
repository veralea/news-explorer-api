const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { CREATED_CODE, EXIST_ERROR_MESSAGE } = require('../utils/constants');
const ExistError = require('../errors/exist-err');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(CREATED_CODE).send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        const error = new ExistError(EXIST_ERROR_MESSAGE);
        next(error);
      }
      next(err);
    });
};

module.exports = {
  createUser,
};
