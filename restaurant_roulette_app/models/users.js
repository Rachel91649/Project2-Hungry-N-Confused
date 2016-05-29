// =====================
// Requirements
// =====================
var mongoose = require('mongoose');

// =====================
// Schemas
// =====================
var userSchema = new mongoose.Schema({
	name: String, 
	myPlaces: Object
});

// ========================
// Map it through Mongoose
// ========================
var Users = mongoose.model('Users', userSchema);

module.exports = Users;