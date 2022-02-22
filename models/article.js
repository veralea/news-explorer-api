const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    required: [true, 'Article link required'],
  },
  image: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    required: [true, 'Image link required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
