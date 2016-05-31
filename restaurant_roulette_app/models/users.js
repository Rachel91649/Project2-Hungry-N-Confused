// =====================
// Requirements
// =====================
var mongoose = require('mongoose');

// =====================
// Schemas
// =====================
var userSchema = new mongoose.Schema({
	userName: String, 
	restaurantName: String, 
	location: String,
	zipcode: Number
});

// ========================
// Map it through Mongoose
// ========================
var Users = mongoose.model('Users', userSchema);

module.exports = Users;