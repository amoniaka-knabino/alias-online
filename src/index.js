import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

const word_db = require('./word-database-controller.js');
const Word = require('./word-class.js');
const Round = require('./round-class.js');
const Player = require('./player-class.js');
console.log(Word);

app.get('/', (req, res) => {
  var player = new Player();
  var raund = player.Round; 
  raund.guessCurrentWord();
  raund.guessCurrentWord();
  raund.guessCurrentWord();
  raund.skipCurrentWord();
  raund.finish();
  res.json([raund.dict(), player.dict()]);
});

app.listen(process.env.PORT, () =>
  console.log(`app listening on port ${process.env.PORT}!`),
);
