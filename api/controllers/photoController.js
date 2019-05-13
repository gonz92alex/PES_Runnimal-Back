'use strict';
var Users = require('../models/users');
var Pets = require('../models/Pets');
var Trainning = require('../models/Trainning')
var ObjectId = require('mongodb').ObjectID;
var path = require('path');
var mkdirp = require('mkdirp');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var type = req.path.split('/')[1];
        var dir = 'photos/' + type + '/';
        mkdirp(dir, function (err) {
            if (err) {
                console.error(err);
            }
            // move cb to here
            cb(null, dir);
        });
    },
    filename: function (req, file, cb) {
        var ext = file.mimetype.split('/')[1];
        var type = req.path.split('/')[1];
        if (type == 'users'){
            cb(null, req.params.email + '.' + 'png')
        }
        else{
            if (type == 'trainnings'){
                cb(null, req.params.id + '.' + 'png')
            }
            else  cb(null, req.params.owner + '-' + req.params.name + '.' + 'png')
        }
        //return res.json({'result':'OK'});
    }
});
var upload = multer({storage:storage, limits: {fileSize: 1000000}});


exports.uploadUser = function (req, res, next) {
    var email = req.params.email;
    if (!email) return res.status(430).send("Bad request, no email provided");
    email = email.trim();
    Users.getOne(email).then((user) => {
        if (user) {
            var uploadUser = upload.single('photo');
            uploadUser(req, res, function (err) {
                if (err) {
                    return next(err);
                }
                return res.json({'result':'OK'});
            });
        }
        else res.status(404).send("User doesn't exists");
    }).catch(err=>{
        res.status(400).send(err);
    });
}

exports.getUser = function (req, res, next) {
    var email = req.params.email;
    if (!email) return res.status(430).send("Bad request, no email provided");
    email = email.trim();
    Users.getOne(email).then((user) => {
        if (user) {
            var files = __dirname+'/../../photos/users/'+ user.email+'.png'
            res.sendFile(path.resolve(files), undefined, function (err) {
                if (err) {
                    files = __dirname+'/../../photos/users/default.png';
                    res.sendFile(path.resolve(files));
                }
            });
        }
        else res.status(404).send("User doesn't exists");
    }).catch(err=>{
        res.status(400).send(err);
    });
}

exports.uploadPet = function (req, res, next) {
    var name = req.params.name;
    var owner = req.params.owner;
    if (!name) return res.status(400).send("Bad request, no name provided");
    if (!owner) return res.status(400).send("Bad request, no owner provided");
    name = name.trim();
    owner = owner.trim();
    Users.getOne(owner).then(user =>{
        if (user) {
            Pets.findOne({'name': name, 'owner':user})
                .exec((err, pet) => {
                if (pet){
                    var uploadPet = upload.single('photo');
                    uploadPet(req, res, function (err) {
                        if (err) {
                            return next(err);
                        }
                        return res.json({'result':'OK'});
                    });
                }
                else res.status(404).send("Pet doesn't exists");    
            });
        }
        else res.status(400).send("Owner doesn't exist");
    }).catch(err=>{
        res.status(400).send(err);
    });
}

exports.getPet = function (req, res, next) {
    var name = req.params.name;
    var owner = req.params.owner;
    if (!name) return res.status(400).send("Bad request, no name provided");
    if (!owner) return res.status(400).send("Bad request, no owner provided");
    name = name.trim();
    owner = owner.trim();
    Users.getOne(owner).then((user) =>{
        if (user){
            Pets.findOne({'name': name, 'owner':ObjectId(user._id)}).populate({ path: 'owner', select: 'email alias' })
                .exec((err, pet) => {
                if (pet){
                    var files = __dirname+'/../../photos/pets/'+ user.email+'-'+pet.name+'.png'
                    res.sendFile(path.resolve(files), undefined, function (err) {
                        if (err) {
                            files = __dirname+'/../../photos/pets/default.png';
                            res.sendFile(path.resolve(files));
                        }
                    });
                }
                else res.status(404).send("Pet doesn't exists");    
            });
        }
        else res.status(400).send("Owner doesn't exist");
    }).catch(err=>{
        res.status(400).send(err);
    });
}

exports.uploadTraining = function (req, res, next) {
    var id = req.params.id;

    if (!id) return res.status(400).send("Bad request, no id provided");

    Trainning.findById(id, function (err, trainning) {
        if(trainning){
            var uploadPet = upload.single('photo');
                    uploadPet(req, res, function (err) {
                        if (err) {
                            return next(err);
                        }
                        return res.json({'result':'OK'});
                    });
        } else {
            return res.status(404).send("Training doesn't exists");    
        }
    });
}

exports.getTraining = function (req, res, next) {
    var id = req.params.id;

    if (!id) return res.status(400).send("Bad request, no id provided");

    Trainning.findById(id, function (err, trainning) {
        if(trainning){
            var files = __dirname+'/../../photos/trainnings/'+ trainning._id+'.png'
            res.sendFile(path.resolve(files), undefined, function (err) {
                if (err) {
                    files = __dirname+'/../../photos/trainnings/default.png';
                    res.sendFile(path.resolve(files));
                }
            });          
        } else {
            return res.status(404).send("Training doesn't exists");    
        }
    });
}