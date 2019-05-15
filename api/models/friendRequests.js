'use strict';

var FriendRequests = require('../db/FriendRequests');
var usersRelationships = require('./usersRelationships');
var Users = require('./users');

exports.getUserPendingRequests = function(email) {
	return Users.getOne(email).then(function(user){
		return FriendRequests.find({requestedId: user.id});
	}).catch(function(err){

	});
}

exports.new = function(requestingEmail, requestedEmail){

	return Users.getOne(requestingEmail).then(function (requestingUser){
		return Users.getOne(requestedEmail).then(function (requestedUser){
			
		}).catch(function(err){

		})
	}).catch(function(err){

	})

	Users.findOne({email: requestingEmail}).exec((err, requestingUser) => {
		if(!requestingUser) res.status(400).send("No users with requestingEmail");
		Users.findOne({email: requestedEmail}).exec((err, requestedUser) => {
			if(!requestedUser) res.status(400).send("No user with requestedEmail");

			FriendRequests.find({requestingId: requestingUser.id, requestedId: requestedUser.id})
				.exec(function (err, requests){
					if (err) res.status(400).send(err);
					if(!requests.length) {
						FriendRequests.find({requestingId: requestedUser.id, requestedId: requestingUser.id})
							.exec(function (err, requests2){
								if (err) res.send(err);
								if(!requests2.length){
									//if (usersRelationshipsController.areFriends(req, res)) 
									//	return res.status(400).send("Users are already friends");
									
									var request = new FriendRequests({
								        requestingId: requestingUser.id,
								        requestedId: requestedUser.id
								    });

								    request.save(function(err) {
								        return res.json(request);
								    });
								} else res.status(200).send("Friend Request already exists");
							});
					} else res.status(200).send("Friend request already exists");
				});	

		});
	});

}