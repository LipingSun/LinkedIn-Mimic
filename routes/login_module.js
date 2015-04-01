var express = require('express');
var session = require('express-session');
var rpc = require('amqp-rpc').factory({
    url: "amqp://guest:guest@127.0.0.1:5672"
});

var loginModule = {};

loginModule.signup = express.Router();
loginModule.signin = express.Router();
loginModule.signout = express.Router();

loginModule.signup.post('/', function(req, res, next) {
    console.log(req.body);
    var rpcReq = {
        service: 'signup',
        message: req.body
    };
    rpc.call('loginServiceQueue', rpcReq, function(rpcRes) {
        console.log('results:', rpcRes);
        if (rpcRes.success === true) {
            req.session.regenerate(function (err) {
                if (!err) {
                    req.session.user = rpcRes.user;
                    req.session.user.last_login_time = null;
                    res.location('/home');
                    res.end('Signup Success');
                }
            });
        } else {
            res.send(rpcRes.value);
        }
    });
});

loginModule.signin.post('/', function(req, res, next) {
    console.log('req: ' + JSON.stringify(req.body));

    var rpcReq = {
        service: 'signin',
        message: req.body
    };

    rpc.call('loginServiceQueue', rpcReq, function(rpcRes) {
        console.log('results:', rpcRes);
        if (rpcRes.success === true) {
            req.session.regenerate(function (err) {
                if (!err) {
                    req.session.user = rpcRes.user;
                    res.location('/home');
                    res.end('Login Success');
                }
            });
        }
        else {
            res.send(rpcRes.value);
        }
    });
});

loginModule.signout.all('/', function(req, res, next) {
    req.session.destroy();
    res.location('/');
    res.render('index');
});

module.exports = loginModule;