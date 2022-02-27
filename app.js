const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World!');
});

app.listen(3000, () =>
  console.log('Express.js listening on port 3000.'));
