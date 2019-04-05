var mongoose = require('mongoose');

var training_schema = new mongoose.Schema({
	name: String,
	description: String,
	steps: []
});

var Training = mongoose.model("Training", training_schema);

module.exports = mongoose.model('Training', training_schema)