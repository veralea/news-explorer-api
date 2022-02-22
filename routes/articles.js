const express = require('express');
const { errors } = require('celebrate');

const {
  getAllArticles, createArticle, deleteArticle,
} = require('../controllers/articles');
const {
  createArticleValidator, deleteArticleValidator,
} = require('../middleware/valid');

const router = express.Router();
router.get('/', getAllArticles);
router.post(
  '/',
  createArticleValidator,
  createArticle,
);

router.delete(
  '/:articleId',
  deleteArticleValidator,
  deleteArticle,
);

router.use(errors());

module.exports = router;
