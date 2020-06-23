import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

const word_db = require('./word-database-controller.js');
const Word = require('./word-class.js');
const Round = require('./round-class.js');
const Player = require('./player-class.js');
const Game = require('./game-class.js');
console.log(Word);

app.get('/', (req, res) => {
  var firstplayer = new Player('lol','lol');
  var nextPlayer = new Player('kek','kek');
  var game = new Game(2, -1, firstplayer);
  console.log(game)
  game.addPlayer(nextPlayer);
  console.log(game)
  var before_game = game.dict();
  game.startGame();
  console.log(game)
  game.startRound();
  console.log(game)
  var after_start = game.dict();
  game.getCurrentRound().guessCurrentWord();
  game.nextRound()
  console.log(game);
  game.getCurrentRound().skipCurrentWord();
  game.getCurrentRound().skipCurrentWord();
  game.finishRound(); //== game.finishGame()
  var afterGame = game.dict()
  console.log(game)
  res.json(afterGame);
});

app.listen(process.env.PORT, () =>
  console.log(`app listening on port ${process.env.PORT}!`),
);
