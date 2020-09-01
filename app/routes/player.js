let express = require('express');
let router = express.Router();

const User = require('../db-controllers/user-model.js');
const DB = require('../db-controllers/database-controller.js');

router.get('/create', async function(req, res) {
  
    userName = req.query.userName;
    console.log(userName);
    userToken = req.query.userToken;
    console.log(userToken);
    await User.createNew(userName, userToken);
    DB.sync();
    res.json("ok");
});

router.get('/logAllToConsole', async function(req, res) {
    await User.logAllUsers();
    res.json("ok");
});

router.get('/getAll', async function(req, res) {
    console.log("getAll");
    let users = await User.findAll()
    console.log("users in getall " + users);
    res.json(users);
});

router.get('/updateScore', async function(req, res) {
    userToken = req.query.userToken;
    console.log(userToken);
    delta = req.query.delta;
    console.log(delta);
    await User.updateScoreByToken(userToken, delta);
    DB.sync();
    res.json("ok");
});

module.exports = router;
