const express = require('express');
const app = express();
const logger = require('./logger');
const httpLogger = require('./httpLogger');

app.use(httpLogger);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World!');
});

app.get('/boom', (req, res, next) => {
  try {
    throw new Error('Wowza!');
  } catch (error) {
    logger.error('Whooops! This broke with error: ', error);
    res.status(500).send('Error!');
  }
});

app.get('/errorhandler', (req, res, next) => {
  try {
    throw new Error('Wowza!');
  } catch (error) {
    next(error);
  }
});

app.use(logErrors);
app.use(errorHandler);

function logErrors (err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler (err, req, res, next) {
  res.status(500).send('Error!');
}

app.listen(3000, () =>
  logger.info('Express.js listening on port 3000.'));
