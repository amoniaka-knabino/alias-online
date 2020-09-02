let express = require('express');
let router = express.Router();

const Round = require('../db-controllers/round-model.js');
const DB = require('../db-controllers/database-controller.js');

router.get('/getCurrentWord', async function(req, res) {
    let uuid = req.query.UUID;
    let word = await Round.getCurrentWordByUUID(uuid);
    res.json(word);
});

router.get('/skipCurrentWord', async function(req, res) {
    let uuid = req.query.UUID;
    await Round.skipWordByUUID(uuid);
    res.json("ok");
});

router.get('/guessCurrentWord', async function(req, res) {
    let uuid = req.query.UUID;
    await Round.guessWordByUUID(uuid);
    res.json("ok");
});

router.get('/getInfo', async function(req, res) {
    let uuid = req.query.UUID;
    let round = await Round.getByUUID(uuid);
    res.json(round);
});

router.get('/finish', async function(req, res) {
    let uuid = req.query.UUID;
    await Round.finishByUUID(uuid);
    res.json("ok");
});

router.get('/create', async function(req, res) {
    let playerToken = req.query.userToken;
    let uuid = await Round.createNew(playerToken);
    res.json({"uuid":uuid});
});

module.exports = router;