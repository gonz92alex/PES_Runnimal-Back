var mongoose = require('mongoose');
//var Users = requiere('./Users')

var sizes = ["Small", "Medium", "Big"];

var PetsModel = new mongoose.Schema({
    name: String,
    weight: Number,
    description: String,
    size: {type: String, enum: {values: sizes, message: "size wrong"}}, 
    race: String,
    birth: Number,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    otherOwners: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
});

PetsModel.index({ name: 1, owner: 1 }, { unique: true });

module.exports = mongoose.model('pets',PetsModel);