'use strict';

var mongoose = require('mongoose').set('debug',true);
var Users = require('../models/Users');
var FriendRequests = require('../models/FriendRequests');
var UsersRelationships = require('../models/UsersRelationships');
var usersRelationshipsController = require('./usersRelationshipsController');
var ObjectId = require('mongodb').ObjectID;

exports.userList = function(req, res) {
	var email = req.params.email;

	if(!email) return res.status(432).send("Bad request, no user email provided");

	Users.findOne({email: email}).exec((err, user) => {
		if(!user) res.send(400).send("No user with this email");
	    FriendRequests.find({requestedId: user.id}).exec((err,requests) => {
	        if (err) res.status(400).send(err);
	        else
	            res
	        		.status(200)
	        		.json(requests);
	    });
	});
};

exports.new = function(req, res) {

	var requestingEmail = req.body.requestingEmail;
	var requestedEmail = req.body.requestedEmail;

	//if(requestingId == requestedId) return res.status(400).send("Bad request, no requesting id provided"); 
	if (!requestingEmail) return res.status(400).send("Bad request, no requesting user email provided");
	if (!requestedEmail) return res.status(400).send("Bad request, no requested user email provided");

	Users.findOne({email: requestingEmail}).exec((err, requestingUser) => {
		if(!requestingUser) res.status(400).send("No users with requestingEmail");
		Users.findOne({email: requestedEmail}).exec((err, requestedUser) => {
			if(!requestedUser) res.status(400).send("No user with requestedEmail");

			FriendRequests.find({requestingId: requestingUser.id, requestedId: requestedUser.id})
				.exec(function (err, requests){
					if (err) res.status(400).send(err);
					if (requests.length) res.status(400).send("Friend request already exists")
					else {
						FriendRequests.find({requestingId: requestedId, requestedId: requestingId})
							.exec(function (err, requests){
								if (err) res.send(err);
								if (requests.length) res.status(400).send("Friend Request already exists")
								else{
									//if (usersRelationshipsController.areFriends(req, res)) 
									//	return res.status(400).send("Users are already friends");
									
									var request = new FriendRequests({
								        requestingId: requestingId,
								        requestedId: requestedId
								    });

								    request.save(function(err) {
								        return res.json(request);
								    });
								};
							});
					};
				});	

		});
	});

	
};

exports.accept = function(req, res){
	var requestId = req.body.id;

	if(!requestId) return res.status(400).send("Bad request, no request id provided");

	FriendRequests.findById(requestId, function (err, request) {
		if (err) res.status(400).send(err);

		if(!request) res.status(400).send("Bad request, no request with this id");
		else {
			/*var answer = usersRelationshipsController
				.newFriendRelationship(request.requestingId, request.requestedId);
			
			res.send(answer);*/
			usersRelationshipsController
				.newFriendRelationship(req, res, request.requestingId, request.requestedId);

			FriendRequests.remove({_id:ObjectId(requestId)}, function(err){
                if (err) res.send("requested not deleted");
            });
		}; 
	});
};

exports.refuse = function(req, res){

	var requestId = req.body.id;

	if(!requestId) return res.status(400).send("Bad request, no request id provided");

	FriendRequests.findByIdAndRemove(requestId, function(err, request){
		res.status(200).send(requestId+" request deleted");
	})
};
