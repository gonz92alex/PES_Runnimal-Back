var mongoose = require('mongoose');

var CompletedTrainnings = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    trainning: {type: mongoose.Schema.Types.ObjectId, ref:'trainning'},
    timescompleted: {type: Number}
});

module.exports = mongoose.model('CompletedTrainnings', CompletedTrainnings);