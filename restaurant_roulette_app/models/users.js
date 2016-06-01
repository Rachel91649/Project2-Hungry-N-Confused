// =====================
// Requirements
// =====================
var mongoose = require('mongoose');

// =====================
// Schemas
// =====================
var userSchema = new mongoose.Schema({
	username: String, 
	restaurantname: String, 
	location: String,
	zipcode: Number
});

// ========================
// Map it through Mongoose
// ========================
var Users = mongoose.model('Users', userSchema);

module.exports = Users;