var mongoose = require('mongoose');

var languages = ["EN", "ES", "CA"];

var trainning_schema = new mongoose.Schema({
	name: String,
	description: String,
	language: {type: String, enum: {values: languages, message: "language wrong"}},
	steps: [String]
});

var Trainning = mongoose.model("Trainning", trainning_schema);

module.exports = Trainning;