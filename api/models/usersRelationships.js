'use strict';

var UsersRelationships = require('../db/usersRelationships');
var FriendRequests = require('./friendRequests');
var Users = require('./users');


exports.getUserFriends = function(userEmail){
    return Users.getOne(userEmail).then(function(user){
        return UsersRelationships
        	.find({ $or:[ {'relatingUserId': ObjectId(user._id)}, 
        		{'relatedUserId': ObjectId(user._id)} ]})
            .populate(relatingUserId)
            .populate(relatedUserId);
    }).catch(function(err){

    });
}

exports.newFriendRelationship = function(relatingUserId, relatedUserId){
    
}