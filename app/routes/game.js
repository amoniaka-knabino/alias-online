const cookieParser = require("cookie-parser");
//var app = require('../app');


var express = require('express');
var router = express.Router();

//app.use(cookieParser());
//const Round = require('../classes/round-class.js');
//const Player = require('../classes/player-class.js');
const Game = require('../classes/game-class.js');

router.get('/join_game', function(req, res) {
    var inviteToken = req.query.inviteToken;
    console.log(inviteToken);
    //req.query("inviteToken");
    var userToken = req.cookies["userToken"];
    console.log(userToken);
    res.json([inviteToken, userToken]);
});


module.exports = router;

