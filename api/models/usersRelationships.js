'use strict';

var UsersRelationships = require('../db/usersRelationships');
var Users = require('./users');
var ObjectId = require('mongodb').ObjectID;

exports.newFriendRequest = function(user1email, user2email){

	return Users.getOne(user1email).then(function (user1){
		return Users.getOne(user2email).then(function (user2){
			return UsersRelationships.find({ $or: [
				{user1: ObjectId(user1._id), user2 : ObjectId(user2._id)},
				{user1: ObjectId(user2._id), user2 : ObjectId(user1._id)}
			]})//.populate('user1').populate('user2')
			.then(function (request){
				if(!request.length){
					var usr = new UsersRelationships({
						user1: user1._id,
						user2: user2._id,
						date: new Date,
						type: "pending"
					});
					return usr.save();
				} else {
					return request;
				}
			}).catch(function (err){

			});
		}).catch(function (err){

		});
	}).catch(function(err){
 
	});
}

exports.delete = function(id){
	return UsersRelationships.findByIdAndDelete(id);
}

exports.acceptFriendRequest = function(id){
	return UsersRelationships.findById(id).then(function(userRelationship){
		if (userRelationship.type == "pending"){
			userRelationship.type = "friend";
			return userRelationship.save();
		} else {
			return userRelationship;
		}
	}).catch(function(err){

	});
}

exports.denyFriendRequest = function(id){
	return UsersRelationships.findById(id).then(function(userRelationship){
		if (userRelationship.type == "pending"){
			userRelationship.type = "denied";
			return userRelationship.save();
		} else {
			return userRelationship;
		}
	}).catch(function(err){

	});
}

exports.userFriends = function(email){
	return Users.getOne(email).then(function(user){
		return UsersRelationships.find({ $or: [
				{user1: ObjectId(user._id), type: "friend"},
				{user2: ObjectId(user._id), type: "friend"}
			]})
			.populate('user1')
			.populate('user2');
	}).catch(function(err){

	});
}

exports.areFriends = function(email1, email2){
	return Users.getOne(email1).then(function(user1){
		return Users.getOne(email2).then(function(user2){
			return UsersRelationships.find({ $or: [
				{user1: ObjectId(user1._id), user2 : ObjectId(user2._id)},
				{user1: ObjectId(user2._id), user2 : ObjectId(user1._id)}
			]})
			.populate('user1')
			.populate('user2');
		}).catch(function (err){

		});
	}).catch(function (err){

	});
};

exports.userFriendRequests = function(email){
	return Users.getOne(email).then(function(user){
		return UsersRelationships.find({user2 : ObjectId(user._id), type: "pending"}, '-user2')
			.populate('user1');
	}).catch(function(err){

	});
}