var mongoose = require('mongoose');

var walkpointsModel = new mongoose.Schema({
    created:  {type: Date, default: Date.now},
    latitude: {type: Number},
    longitude: {type: Number}
});

var walksModel = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    duration: {type: Number},
    title: {type: String},
    distance: {type: Number},
    created:  {type: Date, default: Date.now},
    start: {type: Number},
    end: {type: Number},
    route: {type: [walkpointsModel]}
});
module.exports = mongoose.model('walks',walksModel);