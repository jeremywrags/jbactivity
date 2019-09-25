var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');

dotenv.config();


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

//Load the Config.json file
var configjson  = require('../public/config/config.json');
router.get( '/config.json', function( req, res ) {
  
  console.log(`Your name is ${process.env.ACTIVITY_NAME}`); // 8626

  var activityName = 'ACTIVITY_NAME';
  //Clone the config.json file
  var json = JSON.parse(JSON.stringify(configjson));
	json.lang['en-US'].name = process.env.ACTIVITY_NAME;
  
  //send the updated JSON
  res.status(200).send( json );
});


router.post('/login', function(req, res, next) {
  console.log( 'req.body: ', req.body );
  res.redirect( '/' );
});

router.post('/logout', function(req, res, next) {
  req.session.token = '';
});


module.exports = router;
