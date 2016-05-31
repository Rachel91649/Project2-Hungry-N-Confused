// =====================
// Requirements
// =====================
var mongoose = require('mongoose');

// =====================
// Schemas
// =====================
var userSchema = new mongoose.Schema({
	name: String, 
	restaurant: String, 
});

// ========================
// Map it through Mongoose
// ========================
var Users = mongoose.model('Users', userSchema);

module.exports = Users;