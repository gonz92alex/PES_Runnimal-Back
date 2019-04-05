var mongoose = require('mongoose');
//var Users = requiere('./Users')

var PetsModel = new mongoose.Schema({
    name: String,
    weight: Number,
    description: String,
    size: Number, 
    race: String,
    birth: Number,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
});

module.exports = mongoose.model('pets',PetsModel);