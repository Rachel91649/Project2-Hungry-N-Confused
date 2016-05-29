// ======================
// Requirements
// ======================
var express = require('express');
var router = express();
var request = require('request');
var cookieParser = require('cookie-parser');
var Users = require('../models/users.js');




//Get Index page
//====================================
router.get('/', function(req, res) {
	console.log("===>We've got to the root page<===");
	res.render('index.ejs');
});

//Get Create-User Page
//====================================
router.get('/newuser', function(req, res) {
	console.log("=======>Newbie On The Way<======");
	res.render('createuser.ejs');
});

//Get User Home Screen page
//===================================
router.get('/homepage', function(req, res) {
	console.log("=======>user homepage is working<=====");
	Users.find({}, function(err, users) {
		res.render('homescreen.ejs', {users})
	});
});

//Get Restaurant
//====================================
router.get('/')
//Get Restaurant Show page
//==============================
// router.get('/show', function(req, res) {
// 	res.
// })

module.exports = router;
