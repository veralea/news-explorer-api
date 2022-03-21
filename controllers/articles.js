const Article = require('../models/article');
const {
  CREATED_CODE,
  SUCCESS_CODE,
  NOT_FOUND_ERROR_MESSAGE_ARTICLE,
  DATA_ERROR_MESSAGE,
  RIGHTS_ERROR_MESSAGE,
  RIGHTS_ERROR_MESSAGE_DELETE,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const RightsError = require('../errors/rights-err');
const DataError = require('../errors/data-err');

const getAllArticles = (req, res, next) => {
  Article.find({owner: req.user._id})
    .then((articles) => {
      if (!articles) {
        throw new RightsError(RIGHTS_ERROR_MESSAGE);
      }
      res.status(SUCCESS_CODE).send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, link, image, source,
  } = req.body;

  Article.create({
    keyword, title, text, date, link, image, source, owner: req.user._id,
  })
    .then((article) => {
      if (!article) {
        throw new DataError(DATA_ERROR_MESSAGE);
      }
      res.status(CREATED_CODE).send(article);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE_ARTICLE);
      }
      if (article.owner.valueOf() !== req.user._id) {
        throw new RightsError(RIGHTS_ERROR_MESSAGE_DELETE);
      }
      article.remove();
      res.status(SUCCESS_CODE).send({ data: article });
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
