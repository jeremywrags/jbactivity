var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/install', function(req, res, next) {
  console.log("Loading install page");
  res.send('respond with a resource');
});

module.exports = router;
