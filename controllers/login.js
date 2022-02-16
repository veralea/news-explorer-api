const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

const { JWT_SECRET_LOCAL } = require('../utils/confiq');

const { NODE_ENV = 'development', JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-err');
const { AUTH_ERROR_MESSAGE } = require('../utils/constants');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthError(AUTH_ERROR_MESSAGE);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_LOCAL,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  login,
};
