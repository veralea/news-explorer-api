const Article = require('../models/article');
const {
  CREATED_CODE,
  SUCCESS_CODE,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const RightsError = require('../errors/rights-err');
const DataError = require('../errors/data-err');

const getAllArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      if (!articles) {
        throw new RightsError('no rights to receive all cards');
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
        throw new DataError('Invalid new article data');
      }
      res.status(CREATED_CODE).send(article);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findByIdAndRemove(articleId).select('+owner')
    .then((article) => {
      if (article.owner.valueOf() !== req.user._id) {
        throw new RightsError("This article isn't belongs to this user");
      }
      if (!article) {
        throw new NotFoundError('No article found with that id');
      }
      res.status(SUCCESS_CODE).send({ data: article });
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
