'use strict';

var Pets = require('../../models/pets');

exports.new = function(req, res){
	return res.send(req.params);
}