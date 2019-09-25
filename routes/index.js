var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

//Load the Config.json and default index type files
var configjson  = require('../public/config/config.json');

var json = JSON.parse(JSON.stringify(configjson));

/* GET home page. */
router.get('/', function(req, res, next) {      
  if(json.metaData.index == "")
  {
    var html = fs.readFileSync('./public/default/Wizard.html', 'utf8')
    res.send(html);
  }
  if (!req.session.token) {
    res.render('index', {
      title: 'Unauthenticated',
      errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
    });
  } 
  else
  {
    res.render('index', {
      title: 'Journey Builder Activity',
      results: activity.logExecuteData,
    });
  }
});



router.get( '/config.json', function( req, res ) {
  
  //Clone the config.json file and update values from the env variables  
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
