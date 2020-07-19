let express = require('express');
let router = express.Router();

const Round = require('../classes/round-class.js');
const Player = require('../classes/player-class.js');
const Game = require('../classes/game-class.js');
const User = require('../db-controllers/user-model.js');
const DB = require('../db-controllers/database-controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });
  User.create({ Name: "Jane", Token: "Doe", Score:0 }).then(jane => {
    console.log("Jane's auto-generated ID:", jane.id);
  });
  DB.sync();
  User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });
  User.destroy({
    where: {
      Name: "Jane"
    }
  }).then(() => {
    console.log("Done");
  });
  DB.sync();
  User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });
  res.json([]);
});

module.exports = router;
