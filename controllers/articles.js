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
      console.log(articles);
      res.status(SUCCESS_CODE).send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, link, image, source, owner } = req.body;

  Article.create({ keyword, title, text, date, link, image, source, owner: req.user._id })
    .then((article) => {
      if (!article) {
        throw new DataError('Invalid new article data');
      }
      res.status(CREATED_CODE).send(user);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId, userId } = req.params;

  Article.findByIdAndRemove(articleId)
    .then((article) => {
      if (article.owner.valueOf() !== userId) {
        throw new RightsError("This card isn't belongs to this user");
      }
      if (!article) {
        throw new NotFoundError('No card found with that id');
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