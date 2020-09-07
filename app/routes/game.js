let express = require('express');
let router = express.Router();

const Game = require('../db-controllers/game-model.js');

router.get('/join', async function(req, res) {
    let gameUUID = req.query.gameUUID;
    console.log(gameUUID);
    let userToken = req.query.userToken;
    console.log(userToken);
    var ans = await Game.addPlayer(gameUUID, userToken);
    res.json(ans);
});

router.get('/create', async function(req, res) {
    let userToken = req.query.userToken;
    let roundCount = req.query.roundCount;
    let roundTime = req.query.roundTimeSeconds;
    let gameUUID = await Game.createNew(userToken, roundCount, roundTime);
    res.json({"gameUUID":gameUUID});
});

router.get('/start', async function(req, res) {
    let gameUUID = req.query.gameUUID;
    await Game.startByUUID(gameUUID);
    res.json("ok");
});

router.get('/finish', async function(req, res) {
    let gameUUID = req.query.gameUUID;
    await Game.finishByUUID(gameUUID);
    res.json("ok");
});

router.get('/startRound', async function(req, res) {
    let gameUUID = req.query.gameUUID;
    let ans = await Game.startRound(gameUUID);
    res.json({"RoundUUID":ans});
});

router.get('/finishRound', async function(req, res) {
    let gameUUID = req.query.gameUUID;
    await Game.finishRound(gameUUID);
    res.json("ok");
});

router.get('/getInfo', async function(req, res) {
    let gameUUID = req.query.gameUUID;
    let game = await Game.getByUUID(gameUUID);
    res.json(game);
});

router.get('/getCurrentRoundUUID', async function(req, res) {
    let gameUUID = req.query.gameUUID;
    let ans = await Game.getCurrentRoundUUID(gameUUID);
    res.json(ans);
});

router.get('/getCurrentPlayerToken', async function(req, res) {
    let gameUUID = req.query.gameUUID;
    let ans = await Game.getCurrentPlayerToken(gameUUID);
    res.json(ans);
});

module.exports = router;

