'use strict';

var mongoose = require('mongoose').set('debug',true);
var FriendRequests = require('../models/FriendRequests');

exports.userList = function(req, res) {
	var userId = req.params.userId;

	if(!userId) return res.status(432).send("Bad request, no user id provided");
    
    FriendRequests.find({requestedId: userId}).exec((err,requests) => {
        if (err)
            res.send(err);
        else
            res
        		.status(200)
        		.json(requests);
    });
};

exports.new = function(req, res) {

	var requestingId = req.body.requestingId;
	var requestedId = req.body.requestedId;

	//if(requestingId == requestedId) return res.status(400).send("Bad request, no requesting id provided"); 
	if (!requestingId) return res.status(400).send("Bad request, no requesting user id provided");
	if (!requestedId) return res.status(400).send("Bad request, no requested user id provided");

	FriendRequests.find({requestingId: requestingId, requestedId: requestedId})
		.exec(function (err, requests){
			if (err) res.status(400).send(err);
			if (requests.length) res.status(400).send("Friend request already exists")
			else {
				FriendRequests.find({requestingId: requestedId, requestedId: requestingId})
					.exec(function (err, requests){
						if (err) res.send(err);
						if (requests.length) res.status(400).send("Friend Request already exists")
						else{
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
};

exports.accept = function(req, res){


};

exports.refuse = function(req, res){};
