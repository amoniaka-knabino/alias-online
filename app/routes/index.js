var express = require('express');
var router = express.Router();

const Round = require('../classes/round-class.js');
const Player = require('../classes/player-class.js');
const Game = require('../classes/game-class.js');

/* GET home page. */
router.get('/', function(req, res) {
  var firstplayer = new Player('lol','lol');
  var nextPlayer = new Player('kek','kek');
  var game = new Game(2, -1, firstplayer);
  game.startGame();
  game.startRound();
  console.log(game)
  res.json(game.dict());
});

module.exports = router;
