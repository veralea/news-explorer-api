const User = require('../models/user');
const { SUCCESS_CODE, NOT_FOUND_ERROR_MESSAGE_USER } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE_USER);
    })
    .then((user) => {
      res.status(SUCCESS_CODE).send(user);
    })
    .catch(next);
};

module.exports = {
  getProfile,
};
