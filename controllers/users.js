const User = require('../models/user');
const { SUCCESS_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('No user found with that id');
    })
    .then((user) => {
      res.status(SUCCESS_CODE).send(user);
    })
    .catch(next);
};

module.exports = {
  getProfile,
};
