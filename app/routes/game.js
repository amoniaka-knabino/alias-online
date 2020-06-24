const cookieParser = require("cookie-parser");

var express = require('express');
var router = express.Router();

//app.use(cookieParser());
//const Round = require('../classes/round-class.js');
const Player = require('../classes/player-class.js');
const Game = require('../classes/game-class.js');

router.get('/join', function(req, res) {
    var inviteToken = req.query.inviteToken;
    console.log(inviteToken);
    var userToken = req.cookies["userToken"];
    console.log(userToken);
    res.json([inviteToken, userToken]);
    //get game from db, add player, save to db...
});

router.get('/create', function(req, res) {
    var userToken = req.cookies["userToken"];
    var userName = req.cookies["userName"];
    var roundTime = req.query.roundTime;
    var roundCount = req.query.roundCount;
    var fisrtPlayer = new Player(userName, userToken);
    var game = new Game(roundCount, roundTime, fisrtPlayer);
    console.log(game)
    res.json({"inviteToken":game.InviteToken});
});


module.exports = router;

