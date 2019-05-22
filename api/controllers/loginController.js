'use strict';
var Users = require('../models/users');
var Token = require('../models/tokensDao')



exports.createOrReturn = function(req,res) {
    var alias = req.body.alias;
    var email = req.body.email;
    var password = req.body.password;
    if (!email) return res.status(400).send("Bad request, no email provided");
    if (!password) return res.status(400).send("Bad request, no password provided");
    email = email.trim();
    password = password.trim();
    if (alias) {
        //se crea usuario
        alias = alias.trim();
        Token.createOrReturn(alias, email, password).then(token => {
            if (token)  return res.send(token.token);
            else{
                Token.createToken(email, password).then(tkn=>{
                    console.log(tkn)
                    return res.send(tkn.token);
                }).catch(e =>{
                    return res.status(400).send(e);
                });
            }
        }).catch(err => {
            return res.status(400).send(err);
        });
    }
    else{
        Token.getOne(email, password).then(token=>{
            return res.send(token.token);
        }).catch(err=>{
            console.log('AQI2')
            return res.status(400).send(err);
        });
    }
};

exports.getUser = function(req,res) {
    var token = req.params.token;
    if (!token) return res.status(430).send("Bad request, no token provided");
    token = token.trim();
    return Token.getUser(token).then((tkn) => {
        if (tkn) return res.json(tkn.user);
        else return res.status(404).send("User doesn't exists");
    }).catch(err=>{
        console.log(err);
        return res.status(400).send(err);
    });
};
