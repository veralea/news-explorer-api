const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const route = require('./routes');
const limiter = require('./utils/limiter');
const { MONGO_SERVER, MONGO_LOCAL } = require('./utils/confiq');
const { createUser } = require('./controllers/createUser');
const { login } = require('./controllers/login');
const auth = require('./middleware/auth');
const handleErr = require('./middleware/handle-err');
require('dotenv').config();
const { requestLogger, errorLogger } = require('./middleware/logger');
const { createUserValidator, loginValidator } = require('./middleware/valid');

const { PORT = 3000, NODE_ENV = 'development' } = process.env;

const app = express();
app.use(BodyParser.json());
app.use(cors());
app.options('*', cors());
mongoose.connect(NODE_ENV !== 'production' ? MONGO_LOCAL : MONGO_SERVER);

app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.post('/signup', createUserValidator, createUser);
app.post('/signin', loginValidator, login);
app.use(auth);
app.use('/', route);
app.use(limiter);
app.use(errorLogger);
app.use(errors());
app.use(handleErr);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
