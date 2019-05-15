'use strict';

var mongoose = require('mongoose').set('debug',true);
var FriendRequests = require('../models/FriendRequests');
var ObjectId = require('mongodb').ObjectID;

exports.userPendingRequests = function(req, res) {
	var email = req.params.email;

	if(!email) return res.status(432).send("Bad request, no user email provided");

	FriendRequests.getUserPendingRequests(email).then(function (requests){
		return res.status(200).json(requests)
	}).catch(function(err){
		return res.send(err);
	});
};

exports.new = function(req, res) {

	var requestingEmail = req.body.requestingEmail;
	var requestedEmail = req.body.requestedEmail;

	//if(requestingId == requestedId) return res.status(400).send("Bad request, no requesting id provided"); 
	if (!requestingEmail) return res.status(400).send("Bad request, no requesting user email provided");
	if (!requestedEmail) return res.status(400).send("Bad request, no requested user email provided");

	FriendRequests.new(requestingEmail, requestedEmail).then(function(request){
		return res.status(200).json(request);
	}).catch(function(err){
		return res.send(err);
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
