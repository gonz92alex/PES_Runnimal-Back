var mongoose = require('mongoose');

var types = ["pipican", "park", "other"]; //Añadir aquí futuras posibilidades

var PointsModel = new mongoose.Schema({
    title: String,
    description: String,
    type: {type: String, enum: {values: types, message: "type wrong"}}, 
    photo_url: String,
    coord: {type: [Number], index: '2d'}

});

module.exports = mongoose.model('points', PointsModel);