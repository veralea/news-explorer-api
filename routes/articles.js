const express = require('express');
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};
const validator = require('validator');
const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');

const {
  getAllArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

const router = express.Router();
router.get('/', getAllArticles);
router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateURL),
      image: Joi.string().required().custom(validateURL),
      owner: Joi.string().hex().required(),
    }),
  }),
  createArticle,
);

router.delete(
  '/:articleId/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      articleId: Joi.string().hex().required(),
      userId: Joi.string().hex().required(),
    }),
  }),
  deleteArticle,
);

router.use(errors());

module.exports = router;