let express = require('express');
let router = express.Router();

const User = require('../db-controllers/user-model.js');
const DB = require('../db-controllers/database-controller.js');

router.get('/create', function(req, res) {
  
    userName = req.query.userName;
    console.log(userName);
    userToken = req.query.userToken;
    console.log(userToken);
    User.createNew(userName, userToken);
    DB.sync();
});

router.get('/logAllToConsole', function(req, res) {
    User.logAllUsers();
    res.json([]);
});

router.get('/getAll', function(req, res) {
    console.log("getAll");
    User.findAll().then(users => {console.log("users in getall " + users);
     res.json(users)});
});

module.exports = router;
