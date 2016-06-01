// ======================
// Requirements
// ======================
var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var request = require('request');
var cookieParser = require('cookie-parser');
var Users = require('../models/users.js');
console.log("=======>This is Users Model in Controller.js: ", Users);



//test routes
// router.get('/', function(req, res){
// 	res.json({message: "This is working and responding in json"})
// });

//Get the Index page
router.get('/', function(req, res){
	res.render('index.ejs');
});

//Get the new user page
//=====================
router.get('/newuser', function(req, res) {
	console.log("========> Newbie on the Way<=========");
	res.render('createuser.ejs');
});


router.get('/show', function(req, res) {
	console.log("==========>Show me the Funny!<===========");
	res.render('show.ejs');
});

//Get the Show Page
//========================
// router.get('/:id', function(req, res) {
// 	console.log("==========>Show me the Funny!<===========");
// 	console.log(req.params);
// 	Users.findById(req.params.id).then(function(users) {
// 		res.render('show.ejs', {users});
// 	});
// });

//Get the Edit user page
//==========================
router.get('/:id/edit', function(req, res) {
	console.log("==========>Editing<=========");
	Users.findById(req.params.id, function(err, users) {
		res.render('edit.ejs', {users});
	});
});


router.get('/popular', function(req, res) {
	var response_data;
	request('https://api.vineapp.com/timelines/popular', function(err, response, body) {
		if(!err && response.statusCode == 200) {
			console.log("========>Vine Popular Video Data Below<==========");
			console.log("=========> This is body <============", body);
			response_data = body;
			console.log("========>Response Data <=========", response_data);
		}
	});
	//console.log("==========>response_data: ", response_data);
	res.render('show.ejs', response_data);
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

//possible post route
//====================================
router.route('/video')
	.post(function(req, res) {
		var users = new Users();
		users.video = req.body.video;
		users.save(function(err) {
			if(err) {
				res.send(err);
			} else {
				res.json({message: 'video created'});
			}
	});
});




module.exports = router;

// Scrap and Test Routers
// ============================================================
// This is an example of a chain route handler//I like it---Let's try to incorporate this.  Instruction pointer hits app.route -> gets a random bood -> adds a book -> then updates a book - al within that route.  Because it is chained together there was no need it to look for other routes or wait for direction.
//app.route('/book')
  // .get(function(req, res) {
  //   res.send('Get a random book');
  // })
  // .post(function(req, res) {
  //   res.send('Add a book');
  // })
  // .put(function(req, res) {
  //   res.send('Update the book');
  // });
//==============================================================

//Let's try this again
// router.get('/likedmovies', function(req, res) {
// 	var response_data;
// 	request("http://www.omdbapi.com/?t=happy+feet&y=&plot=short&r=json", function(err, response, body) {
// 		if(!err && response.statusCode == 200) {
// 			console.log("API data below<====");
// 			console.log(body);
// 			response_data = body;
// 		};
// 	});
// 	console.log(response_data);
// 	res.json(response_data);
// });

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




