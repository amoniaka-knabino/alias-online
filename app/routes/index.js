var express = require('express');
var router = express.Router();

const Round = require('../classes/round-class.js');
const Player = require('../classes/player-class.js');
const Game = require('../classes/game-class.js');
const sequelize = require('../classes/game-database-controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
});

module.exports = router;
