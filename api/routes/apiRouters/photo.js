var express = require("express");

var photo = require('../../controllers/photoController');
var photos = require('../../models/photoModel');
var photoRouter = express.Router();

photoRouter.route("/user/:email")
    .post(photos['upload'].single('profile'), photo.uploadUser)
    .get(photo.getUser);

