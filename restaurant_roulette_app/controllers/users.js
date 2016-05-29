// ======================
// Requirements
// ======================
var express = require('express');
var router = express();
var request = require('request');
var Users = require('../models/users.js');



router.get('/', function(req, res) {
	console.log("=======>index router is working<=====");
	Users.find({}, function(err, users) {
		res.render('index.ejs', {users})
	});
});

//CREATE
// router.post('/createUser', function(req, res){
// 	//grab user data from forms
// 	var userData = req.body;
// 	//grab new User object with req.body data
// 	var user = new Users(req.body);
// 	//create new User and redirect to root page
// 	Users.create(userData, function(err, user){
//  		res.cookie('name', user.name);
//  		res.redirect('/films/');
// 	});
// });

// To hit the OMDB API, we make a get request:

//   // show
//  router.get('/movies/:title',function(req,res){
//  //grab movie title from form
//  var title = req.params.title;
// //create new variable for movie
// var myMovie;
// //GET REQUEST to OMDB API, using title
// request('http://www.omdbapi.com/?t=' + title, function(error, response, body){
//   //if this request IS SUCCESSFUL
//   if(!error && response.statusCode == 200){
//   //save JSON object to myMovie variable
//   myMovie = JSON.parse(body);
//   //display show page using this data
//   res.render('show.ejs', {movie: myMovie});
//  }
//   })
// });

module.exports = router;
