const express = require('express');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const validationErrors = require('celebrate').errors;
const router = require('./routes/index');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Присоединился к БД');
  });

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://mesto.xenyanemkina.nomoredomains.rocks',
  ],
  credentials: true,
};
app.use('*', cors(options));
app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.use(errorLogger);
app.use(validationErrors());
app.use(errors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
