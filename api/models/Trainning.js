var mongoose = require('mongoose');

var trainning_schema = new mongoose.Schema({
	name: String,
	description: String,
	steps: []
});

var Trainning = mongoose.model("Trainning", trainning_schema);

module.exports = Trainning;