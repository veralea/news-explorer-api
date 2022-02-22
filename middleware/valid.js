const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const createUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

const loginValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const createArticleValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateURL),
    image: Joi.string().required().custom(validateURL),
  }),
});

const deleteArticleValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    articleId: Joi.string().hex().required(),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  createArticleValidator,
  deleteArticleValidator,
};
