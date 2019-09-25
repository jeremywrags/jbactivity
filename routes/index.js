var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.token) {
    res.render('index', {
      title: 'Unauthenticated',
      errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
    });
  } else {
    res.render('index', {
      title: 'Journey Builder Activity',
      results: activity.logExecuteData,
    });
  }
});

router.post('/login', function(req, res, next) {
  console.log( 'req.body: ', req.body );
  res.redirect( '/' );
});

router.post('/logout', function(req, res, next) {
  req.session.token = '';
});


module.exports = router;
