'use strict';

var mongoose = require('mongoose').set('debug',true);
var UsersRelationships = require('../models/UsersRelationships');
var Users = require('../models/Users');

var utils = require('../utils.js');

exports.searchFriends = function(req, res){

	Users.find().exec((err,users) => {
        if (err)
            res.send(err);
        else
        	var usersRelationship = [];
            users.forEach(function(user, userIndex, array){
            	
            	var i = userIndex % 3;
            	var relationshipStatus;
            	switch(i){
            		case 0:
            			relationshipStatus = 'friend';
            			break;
            		case 1:
            			relationshipStatus = 'blocked';
            			break
            		case 2:
            			relationshipStatus = 'none';
            			break;
            	}

            	var obj = {
            		_id : user['_id'],
            		alias: user['alias'],
  					email: user['email'],
  					password: user['password'],
  					relationshipStatus: relationshipStatus
            	};
            	
            	usersRelationship.push(obj);
            });
            res.send(usersRelationship)
    });
};

exports.newFriendRelationship = function(req, res, relatingUserId, relatedUserId) {

	var maxMin = utils.maxMin(relatingUserId, relatedUserId);

	UsersRelationships.find({relatingUserId: maxMin.min, relatedUserId: maxMin.Max, type: "friend"})
		.exec(function (err, relationships){
			if (err) res.status(400).send(err); 
			if (relationships.length) return res.status(400).send("Users are already friends");
			else {
				var userRelationship = new UsersRelationships({
					relatingUserId: maxMin.min,
					relatedUserId: maxMin.max,
					date: new Date,
					type: "friend"
				});

				userRelationship.save(function(err) {
					if (err) return res.send(err);
					res.json(userRelationship);
				})
			};
		});
};

exports.deleteFriendshipRelationship = function(req, res) {

	var relationshipId = req.params.id;

	if(!relationshipId) return res.status(400).send("Bad request, no relationshipId provided");	
	UsersRelationships.findByIdAndRemove(relationshipId, function (err, relationship) {
		if(err) return res.status(400).send(err);
		else if (relationship) res.status(200).send(relationshipId+" relationship deleted");
		else return res.status(400).send("Bad request, no friendship relationship with this id");
	});
};

exports.areFriends = function(req, res){
	var requestingId = req.body.requestingId;
	var requestedId = req.body.requestedId;

	//if(requestingId == requestedId) return res.status(400).send("Bad request, no requesting id provided"); 
	if (!requestingId) return res.status(400).send("Bad request, no requesting user id provided");
	if (!requestedId) return res.status(400).send("Bad request, no requested user id provided");

	var maxMin = utils.maxMin(requestingId, requestedId);

	UsersRelationships.find({relatingUserId: maxMin.min, relatedUserId: maxMin.Max, type: "friend"})
		.exec(function (err, relationship){
			if(err) return res.status(400).send(err);
			else if(relationship) return res.status(400).send("Users are already friends");
			else return res.status(200).send(false);	
		});
};

exports.list = function(req, res){
    UsersRelationships.find().exec((err,requests) => {
        if (err)
            res.send(err);
        else
            res
        		.status(200)
        		.json(requests);
    });
};

exports.newDefault = function(req, res){
	var relationship = new UsersRelationships({
		relatingUserId: '5c9cb42899e42e72babc8d11',
		relatedUserId: '5c9cb65499e42e72babc8d12',
		date: new Date,
		type: 'friend'
	});
	relationship.save(function(err) {
		if(err) res.send(err);
        return res.json(relationship);
    });
};