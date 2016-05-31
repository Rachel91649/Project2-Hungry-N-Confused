// ======================
// Requirements
// ======================
var express = require('express');
var router = express();
var request = require('request');
var cookieParser = require('cookie-parser');
var Food = require('../models/users.js');

var Yelp = require('yelp');

var yelp = new Yelp({//Yelp is a function and I passed the keys as an argument through Yelp
	consumer_key: process.env.YELP_CONSUMER_KEY,
	consumer_secret: process.env.YELP_CONSUMER_SECRET_KEY,
	token: process.env.YELP_TOKEN,
	token_secret: process.env.YELP_TOKEN_SECRET
});


router.get('/', function(req, res) {
	var response_data;
	yelp.search({term: 'food', location: '11237', radius_filter: 20}, function(error, data, body) {
		//console.log('====>err: ', error);
		// console.log('======>body: ', body);
		// response = body;
		console.log('===========>Yelp Data Comes Back as an: ', typeof data);
		console.log('===========>Yelp Data: ', data);
		//console.log('=========>get me body<=======', body);//comes back undefined
		response_data = body;
		console.log("Let's git it response_data: ", response_data);//comes back undefined	
	});
	//res.send(yelp.search);
});

router.get('/:')

//Get Index page
//====================================
// router.get('/', function(req, res) {
// 	console.log("===>We've got to the root page<===");
// 	res.render('index.ejs');
// });

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


module.exports = router;

//Get Restaurant - This is my 1st API Request
//========================================
// router.get('/', function(req, res) {
// 	var response_data;
// 	request('https://api.yelp.com/v2/search/?location=10010&sort=2&limit=4&radius_filter=1000', function(err, response, body) {
// 		if(!err && response.statusCode == 200) {
// 			console.log("Yelp API Data Below======>");
// 			console.log(body);
// 			response_data = body;
// 			deepPrint(response_data);
// 		}
// 	});
// 	console.log("The Responses======>", response_data);
// 	res.json(response_data);
// });
//WTF!!!! why are my credentials coming back invalid

//Get Restaurant Show page
//==============================
// router.get('/show', function(req, res) {
// 	res.
// });


