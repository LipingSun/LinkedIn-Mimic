var express = require('express');
var mysql = require('./mysql');
var time = require('./time');
var session = require('express-session');
var crypto = require('crypto');
var rpc = require('amqp-rpc').factory({
    url: "amqp://guest:guest@127.0.0.1:5672"
});

var loginService = {};

loginService.signup = express.Router();
loginService.signin = express.Router();
loginService.signout = express.Router();

loginService.signup.post('/', function(req, res, next) {
    console.log(req.body);
    var rpcReq = {
        service: 'signup',
        message: req.body
    };
    rpc.call('loginServiceQueue', rpcReq, function(rpcRes) {
        console.log('results:', rpcRes);
        if (rpcRes.success === true) {
            req.session.regenerate(function (err) {
                req.session.user = rpcRes.user;
                req.session.user.last_login_time = null;
                res.location('/home');
                res.end('Signup Success');
            });
        } else {
            res.send(rpcRes.value);
        }
    });
});

loginService.signin.post('/', function(req, res) {
    console.log('req: ' + JSON.stringify(req.body));

    var rpcReq = {
        service: 'signin',
        message: req.body
    };

    rpc.call('loginServiceQueue', rpcReq, function(rpcRes) {
        console.log('results:', rpcRes);
        if (rpcRes.success === true) {
            req.session.regenerate(function (err) {
                req.session.user = rpcRes.user;
                res.location('/home');
                res.end('Login Success');
            });
        }
        else {
            res.send(rpcRes.value);
        }
    });
});

module.exports = loginService;