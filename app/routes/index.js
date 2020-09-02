let express = require('express');
let router = express.Router();

router.get('/', async function(req, res) {
  res.json("These aren't the Droids you're looking for. . .");
});


module.exports = router;

