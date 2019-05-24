var mongoose = require('mongoose');

var walkpointsModel = new mongoose.Schema({
    created:  {type: Date, default: Date.now},
    coord: {type: [Number], index: '2d'}
});

var walksModel = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    duration: {type: Number},
    distance: {type: Number},
    created:  {type: Date, default: Date.now},
    beginDate: {type: Number},
    endDate: {type: Number},
    walkpoints: {type: [walkpointsModel]}
});
module.exports = mongoose.model('walks',walksModel);