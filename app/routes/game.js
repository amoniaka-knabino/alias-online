const cookieParser = require("cookie-parser");

let express = require('express');
let router = express.Router();

//app.use(cookieParser());
//const Round = require('../classes/round-class.js');
const Player = require('../classes/player-class.js');
const Game = require('../classes/game-class.js');

router.get('/join', function(req, res) {
    let inviteToken = req.query.inviteToken;
    console.log(inviteToken);
    let userToken = req.cookies["userToken"];
    console.log(userToken);
    res.json([inviteToken, userToken]);
    //get game from db, add player, save to db...
});

router.get('/create', function(req, res) {
    let userToken = req.cookies["userToken"];
    let userName = req.cookies["userName"];
    let roundTime = req.query.roundTime;
    let roundCount = req.query.roundCount;
    let firstPlayer = new Player(userName, userToken);
    let game = new Game(roundCount, roundTime, firstPlayer);
    console.log(game)
    //add game to db
    res.json({"inviteToken":game.InviteToken});
});


module.exports = router;

