// ======================
// Requirements
// ======================
var express = require('express');
var router = express();
var request = require('request');
var cookieParser = require('cookie-parser');
var Users = require('../models/users.js');

var Yelp = require('yelp');

var yelp = new Yelp({//Yelp is a function and I passed the keys as an argument through Yelp
	consumer_key: process.env.YELP_CONSUMER_KEY,
	consumer_secret: process.env.YELP_CONSUMER_SECRET_KEY,
	token: process.env.YELP_TOKEN,
	token_secret: process.env.YELP_TOKEN_SECRET
});

//Index - Root page
router.get('/', function(req, res) {
	console.log("========Index Router is working=======");
	res.render('index.ejs');
});

// Get new user page
// router.get('/newuser', function(req, res) {
// 	res.render('createuser.ejs');
// });

//Get Search Page
router.get('/:id/search', function(req, res) {
	console.log(req.params.id);
	Users.findById(req.params.id).then(function(users) {
		res.render('search.ejs', {users});
	})
	// var id = req.params.id;
	// var user = Users.findById(id);
	// console.log(user);
	// console.log(users);
	// console.log("=======search router is working=======");
	// res.render('search.ejs', {users});
});

//get results Page
router.get('/results', function(req, res) {
	console.log("========results router is working=========");
	res.render('results.ejs');
});

//Get Create-User Page
//====================================
router.get('/new', function(req, res) {
	console.log("=======>Newbie On The Way<======");
	res.render('createuser.ejs');
});

// =======Post and Put Routes =========//
// Post new user
router.post('/', function(req, res){
	//grab user data from forms
	//console.log(req.body);
	var user = new Users(req.body);
	user.save(function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("======>Posting New User<=======");
			res.redirect('/users/'+ user._id);
		}
		//res.render('show.ejs');
	})
	// var userData = req.body;
	// //grab new User object with req.body data
	// var user = new Users(req.body);
	//  //create new User and redirect to root page
	//  Users.create(userData, function(err, user){
	//   res.cookie('name', users.userName);
	//   res.redirect('/searchterms/');
 // 	});
});


//Show user on show page
//===================================
router.get('/:id', function(req, res) {
	// console.log("=======>user show page is working<=====");
	// console.log("=======> this is users: ", Users);
	Users.findById(req.params.id).then(function(users) {
		res.render('showuser.ejs', {users});
	})
	//res.render('showuser.ejs', {Users});
});

//Get Edit User Page
//=================================
router.get('/:id/edit', function(req, res) {
	console.log("==========making some changes=========");
	Users.findById(req.params.id, function(err, users) {
		res.render('edituser.ejs', {users});
	});
});

// Update an edit
//=========================
router.put('/:id', function(req, res) {
	console.log(req.body);
	console.log(req.params.id);
	console.log("===>Updating My Edits<===");
	var query = {"_id": req.params.id};
	console.log("====== this is query: " + query);
	Users.findOneAndUpdate(query, req.body, function(err, users){
		if(err){
			throw err;
		} else {
			res.redirect('/users/' + req.params.id);
		}
	});
});
//Post search and display on results page
router.post('/:id/search', function(req, res) { 
	console.log(req.body);
	var zipcode = req.body.zipcode;
	var distance = req.body.distance;
	var user;
	Users.findById(req.params.id, function(err, users) {
		user = users;
		console.log(user);
		yelp.search({term: 'food', location:  zipcode, radius_filter: distance}, 
		function(error, data, body) {
		// console.log('===========>Yelp Data Comes Back as an: ', typeof data);
	  // var data = data;
	  console.log(data);
	  console.log(body);		
		res.render('results.ejs', {data: data, users: user});
	});
	});
	// yelp.search({term: 'food', location:  zipcode, radius_filter: distance}, 
	// 	function(error, data, body) {
	// 	// console.log('===========>Yelp Data Comes Back as an: ', typeof data);
	//   // var data = data;
	//   console.log(data);
	//   console.log(body);		
	// 	res.render('results.ejs', {data: data});
	// });
});

router.put('/:id/restaurantupdate', function(req, res){
	console.log(req.body.restaurantname);
	var query = {"_id": req.params.id};
	Users.findOneAndUpdate(query, req.body, function(err, users){
		if(err){
			throw err;
		} else {
			res.redirect('/users/' + req.params.id);
		}
	});
});

// ======================
// Delete
// ======================
router.delete('/:id', function(req, res) {
	console.log("===>Deleting<===")
	var query = req.params.id;
	Users.findByIdAndRemove(query, function(err, products) {
		if(err) {
			console.log("you broke it!!");
		} else {
			res.redirect('/users');
		}
	});
});



module.exports = router;




//=============================== SCRAP ROUTES ===============================
//Get Restaurant - This is my 1st API Request
//========================================
// router.get('/yelp', function(req, res) {
// console.log("Yelp router is working");
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
// {
// 	region: 
//   { 
//   	span: { latitude_delta: 0, longitude_delta: 0 },
//   	center: { latitude: 40.7043156, longitude: -73.9212858 }
//   },
  
//   total: 2,
  
//   businesses: [
//   	{ is_claimed: false,
//        rating: 5,
//        mobile_url: 'http://m.yelp.com/biz/fog-city-sundries-brooklyn?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=oJtu6Zrle-KYPWtQB-NrTg',
//        rating_img_url: 'https://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png',
//        review_count: 2,
//        name: 'Fog City Sundries',
//        rating_img_url_small: 'https://s3-media1.fl.yelpcdn.com/assets/2/www/img/c7623205d5cd/ico/stars/v1/stars_small_5.png',
//        url: 'http://www.yelp.com/biz/fog-city-sundries-brooklyn?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=oJtu6Zrle-KYPWtQB-NrTg',
//        categories: [Object],
//        snippet_text: 'I bought a KITCHEN SINK at the market at Maria Hernandez Park and loved it! The sweetness is very subtle, so you can have it pure, with other sweet stuff,...',
//        image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/NMZsqk9G16QVvmVseU4SIg/ms.jpg',
//        snippet_image_url: 'http://s3-media3.fl.yelpcdn.com/photo/gWQABT45oB97IHEvj4QwCA/ms.jpg',
//        rating_img_url_large: 'https://s3-media3.fl.yelpcdn.com/assets/2/www/img/22affc4e6c38/ico/stars/v1/stars_large_5.png',
//        id: 'fog-city-sundries-brooklyn',
//        is_closed: false,
//        location: { cross_streets: 'Clinton St & Montgomery St',
// 			  city: 'New York',
// 			  display_address: [ '259 E Broadway', 'Lower East Side', 'New York, NY 10002' ],
// 			  geo_accuracy: 8,
// 			  neighborhoods: [ 'Lower East Side' ],
// 			  postal_code: '10002',
// 			  country_code: 'US',
// 			  address: [ '259 E Broadway' ],
// 			  coordinate: { latitude: 40.7142143249512, longitude: -73.9854278564453 },
// 			  state_code: 'NY' }
//     },
//     { is_claimed: false,
//        rating: 3,
//        mobile_url: 'http://m.yelp.com/biz/annas-best-gourmet-deli-brooklyn?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=oJtu6Zrle-KYPWtQB-NrTg',
//        rating_img_url: 'https://s3-media3.fl.yelpcdn.com/assets/2/www/img/34bc8086841c/ico/stars/v1/stars_3.png',
//        review_count: 5,
//        name: 'Anna\'s Best Gourmet Deli',
//        rating_img_url_small: 'https://s3-media3.fl.yelpcdn.com/assets/2/www/img/902abeed0983/ico/stars/v1/stars_small_3.png',
//        url: 'http://www.yelp.com/biz/annas-best-gourmet-deli-brooklyn?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=oJtu6Zrle-KYPWtQB-NrTg',
//        categories: [Object],
//        snippet_text: 'Great  coffee spot...great sandwiches. .All boarshead cold cuts...The owner is friendly and easy to talk to ..my favorite dish there is the western omelet....',
//        image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/JNYTa8ttzb1Wz99WXNSZPA/ms.jpg',
//        snippet_image_url: 'http://s3-media3.fl.yelpcdn.com/photo/akriFlcKxRheyf6W3MAxrA/ms.jpg',
//        rating_img_url_large: 'https://s3-media1.fl.yelpcdn.com/assets/2/www/img/e8b5b79d37ed/ico/stars/v1/stars_large_3.png',
//        id: 'annas-best-gourmet-deli-brooklyn',
//        is_closed: false,
//        location: [Object]
//     }
// 	]
// }


//to call this route in postman do: http://localhost:3000/restaurantroulette/term/location/radius_filter
// router.get('/:term/:location/:radius_filter', function(req, res) {
// 	var response_data;
// 	yelp.search({term: 'food', location: '11237', radius_filter: 20}, function(error, data, body) {
// 		//console.log('====>err: ', error);
// 		// console.log('======>body: ', body);
// 		// response = body;
// 		console.log('===========>Yelp Data Comes Back as an: ', typeof data);
// 		console.log('===========>Yelp Data: ', data);
// 		//console.log('=========>get me body<=======', body);//comes back undefined
// 		response_data = body;
// 		console.log("Let's git it response_data: ", response_data);//comes back undefined	
// 		res.render('results.ejs', {response_data});
// 	});

// })

//Post search and display on results page
// router.post('/search', function(req, res) { 
// 	console.log(req.body);
// 	var zipcode = req.body.zipcode;
// 	var distance = req.body.distance;
// 	yelp.search({term: 'food', location:  zipcode, radius_filter: distance}, function(error, data, body) {
// 		// console.log('====>err: ', error);
// 		// console.log('======>body: ', body);
// 		// response = body;
// 		console.log('===========>Yelp Data Comes Back as an: ', typeof data);
// 		console.log('===========>Yelp Business Name:', data.businesses[0].name);
// 		console.log('===========>Yelp Data: ', data.businesses[0].location.address[0]);
// 	  var data = data;//If I want this to truly be random, I need to make it loop over businesses using math.random in the results.ejs
// 	 	//  console.log('=======> data var is: ', typeof data)
// 		// var dataAdress = data.businesses[0].location.address[0];

// 		// var data = {dataName: {
// 		// 		data: business.name,
// 		// 	// dataNeighborhood: data.business[0].neighborhoods,
// 		// 	// dataAddress: data.business[0].location.address,
// 		// 	// dataCity: data.business[0].location.city,
// 		// } 
// 		//console.log("========> new data var:", data);
// 		// possible way to display data by using an object
// 		//console.log('=========>get me body<=======', body);//comes back undefined
// 		// response_data = body;
// 		// console.log("Let's git it response_data: ", response_data);//comes back undefined	
// 		//res.render('results.ejs', {data: data});
// 		res.render('results.ejs', {data: data});
// 	});
// });
