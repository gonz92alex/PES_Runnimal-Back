var mongoose = require('mongoose');


var walksStatistics = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    walksNumber: {type: Number},
    totalduration: {type: Number},
    totaldistance: {type: Number}   
});

module.exports = mongoose.model('walksStatistics',walksStatistics);