// ======================
// Requirements
// ======================
var express = require('express');
var router = express();
var request = require('request');
var cookieParser = require('cookie-parser');
var Users = require('../models/users.js');


//index page
//===================================
router.get('/', function(req, res) {
	console.log("=======>index router is working<=====");
	Users.find({}, function(err, users) {
		res.render('index.ejs', {users})
	});
});

//Get Create-User Page
//====================================
router.get('/newuser', function(req, res) {
	console.log("=======>Newbie On The Way<======");
	res.render('createuser.ejs');
});



module.exports = router;
