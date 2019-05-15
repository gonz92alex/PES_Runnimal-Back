var mongoose = require('mongoose');

var owners = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    petId: {type: mongoose.Schema.Types.ObjectId, ref: 'pets'}, 
});

owners.index({ userId: 1, petId: 1}, { unique: true });

module.exports = mongoose.model('owners',owners);