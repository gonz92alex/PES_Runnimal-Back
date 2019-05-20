'use strict';

var mongoose = require('mongoose').set('debug',true);
var UsersRelationships = require('../models/usersRelationships');

var utils = require('../utils.js');

exports.newFriendRequest = function(req, res){
	var user1 = req.body.user1;
    var user2 = req.body.user2;

    if (!user1) return res.status(400).send("Bad request, no user1 id provided");
    if (!user2) return res.status(400).send("Bad request, no user2 id provided");

    UsersRelationships.newFriendRequest(user1, user2).then(function(friendRequest){
    	return res.status(200).json(friendRequest);
    }).catch(function(err){
    	return res.send(err);
    });
}

exports.userFriends = function(req, res){
	var email = req.params.email;

	UsersRelationships.userFriends(email).then(function (requests){
		if(requests.length) return res.status(200).json(requests);
		else return res.status(204).json(requests);
	}).catch(function (err){
		return res.send(err);
	})
}

exports.answerFriendRequest = function(req, res){
	var id = req.params.id;
	var action = req.body.action;
	if (!action) return res.status(400).send("Bad request, no action provided");

	if(action == "accept"){
		UsersRelationships.acceptFriendRequest(id).then(function(userRelationship){
			return res.status(200).json(userRelationship);
		}).catch(function (err){
			return res.send(err);
		});
	} else if(action == "deny"){
		UsersRelationships.denyFriendRequest(id).then(function (userRelationship){
			return res.status(200).json(userRelationship);
		}).catch(function (err){
			return res.send(err);
		});
	}else{
		return res.send("action not accepted");
	}
}

exports.deleteFriendshipRelationship = function(req, res){
	var id = req.params.id;

	UsersRelationships.delete(id).then(function (userRelationship){
		return res.status(200).json(userRelationship);
	}).catch(function (err){
		return res.send(err);
	})
}

exports.areFriends = function(req, res){
	var user1email = req.params.user1email;
	var user2email = req.params.user2email;

	UsersRelationships.areFriends(user1email, user2email).then(function (userRelationship){
		return res.status(200).json(userRelationship);
	}).catch(function (err){
		return res.send(err);
	})
}

exports.userFriendRequests = function(req, res){
	var email = req.params.email;

	UsersRelationships.userFriendRequests(email).then(function (requests){
		return res.status(200).json(requests);
	}).catch(function (err){
		return res.send(err);
	})
}
