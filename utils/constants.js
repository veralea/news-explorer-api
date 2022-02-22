const INTERNAL_SERVER_ERROR_CODE = 500;
const NOT_FOUND_ERROR_CODE = 404;
const VALID_ERROR_CODE = 400;
const CREATED_CODE = 201;
const SUCCESS_CODE = 200;

const EXIST_ERROR_MESSAGE = 'User already exists';
const AUTH_ERROR_MESSAGE = 'Invalid email or password';
const NOT_FOUND_ERROR_MESSAGE_USER = 'No user found with that id';
const NOT_FOUND_ERROR_MESSAGE_ARTICLE = 'No article found with that id';
const DATA_ERROR_MESSAGE = 'Invalid new article data';
const RIGHTS_ERROR_MESSAGE = 'No rights to receive all cards';
const RIGHTS_ERROR_MESSAGE_DELETE = 'This article isn\'t belongs to this user';

module.exports = {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  VALID_ERROR_CODE,
  CREATED_CODE,
  SUCCESS_CODE,
  EXIST_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE_USER,
  NOT_FOUND_ERROR_MESSAGE_ARTICLE,
  DATA_ERROR_MESSAGE,
  RIGHTS_ERROR_MESSAGE,
  RIGHTS_ERROR_MESSAGE_DELETE,
};
