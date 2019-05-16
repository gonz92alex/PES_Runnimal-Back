'use strict';

var UsersRelationships = require('../db/usersRelationships');
var Users = require('./users');
var ObjectId = require('mongodb').ObjectID;

exports.newFriendRequest = function(userId1, userId2){

	return Users.getOneById(userId1).then(function (user1){
		return Users.getOneById(userId2).then(function (user2){
			return UsersRelationships.find({ $or:[ {'userId1': ObjectId(userId1)}, 
			{'userId2': ObjectId(userId2)} ]})
			.populate(userId1)
			.populate(userId2).then(function(userRelationship){
				if(!userRelationship){
					var usr = new UsersRelationships({
						userId1: userId1,
						userId2: userId2,
						date: new Date,
						type: "pending"
					});
					return usr.save();
				};
				return userRelationship;
			})
		}).catch(function (err){

		});
	}).catch(function(err){
 
	});
}