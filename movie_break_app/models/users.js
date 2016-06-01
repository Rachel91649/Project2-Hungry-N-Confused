// =====================
// Requirements
// =====================
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
// =====================
// Schemas
// =====================
var userSchema = new Schema({
	name: String, 
	searchTerm: String,
	video: String 
});

// ========================
// Map it through Mongoose
// ========================
var Users = mongoose.model('Users', userSchema);

module.exports = Users;