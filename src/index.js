import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

const word_db = require('./word-database-controller.js');
const Word = require('./word-class.js');
console.log(Word);

app.get('/', (req, res) => {
  var randomWord = word_db.getRandomWord();
  var word = new Word(randomWord);
  res.json(word.dict());
});

app.listen(process.env.PORT, () =>
  console.log(`app listening on port ${process.env.PORT}!`),
);
