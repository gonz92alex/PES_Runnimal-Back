var mongoose = require('mongoose');
//var Users = requiere('./Users')

var sizes = ["Small", "Medium", "Big"];

var PetsModel = new mongoose.Schema({
    name: String,
    weight: Number,
    description: String,
    size: {type: String, enum: {values: sizes, message: "size wrong"}}, 
    breed: String,
    birth: Number,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('pets',PetsModel);