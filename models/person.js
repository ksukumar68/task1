var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	Name: {type : String, required: true},
	Age: {type : Number, required: true},
	Gender: {type : String, required: true},
	Mobile_Number: {type : Number, required: true},
});

module.exports = mongoose.model('Person', schema);