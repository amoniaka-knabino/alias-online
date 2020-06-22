import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

var word_db = require('./word-database-controller.js');

app.get('/', (req, res) => {
  var words = word_db.getRandomWord();
  res.send(words);
});

app.listen(process.env.PORT, () =>
  console.log(`app listening on port ${process.env.PORT}!`),
);
