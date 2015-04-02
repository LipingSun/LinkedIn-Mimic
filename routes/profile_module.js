var express = require('express');
var session = require('express-session');
var rpc = require('amqp-rpc').factory({
    url: "amqp://guest:guest@127.0.0.1:5672"
});

var profileModule = {};

profileModule.getProfile = express.Router();
profileModule.createProfile = express.Router();
profileModule.editProfile = express.Router();
profileModule.createProfile = express.Router();

profileModule.getProfile.get('/', function(req, res) {
    var rpcReq = {
        service: 'getProfile',
        message: req.query
    };
    rpc.call('profileServiceQueue', rpcReq, function(rpcRes) {
        if (rpcRes.success === true) {
            console.log('results:', rpcRes.data);
            res.send(rpcRes.data);
        }
        else {
            res.send(rpcRes.value);
        }
    });
});

profileModule.createProfile.get('/', function(req, res) {
    var rpcReq = {
        service: 'createProfile',
        message: req.query
    };
    rpc.call('profileServiceQueue', rpcReq, function(rpcRes) {
        if (rpcRes.success === true) {
            console.log('results:', rpcRes.data);
            res.send(rpcRes.data);
        }
        else {
            res.send(rpcRes.value);
        }
    });
});

profileModule.editProfile.get('/', function(req, res) {
    var rpcReq = {
        service: 'editProfile',
        message: req.query
    };
    rpc.call('profileServiceQueue', rpcReq, function(rpcRes) {
        if (rpcRes.success === true) {
            console.log('results:', rpcRes.data);
            res.send(rpcRes.data);
        }
        else {
            res.send(rpcRes.value);
        }
    });
});

profileModule.createProfile.get('/', function(req, res) {
    var rpcReq = {
        service: 'createProfile',
        message: req.query
    };
    rpc.call('profileServiceQueue', rpcReq, function(rpcRes) {
        if (rpcRes.success === true) {
            console.log('results:', rpcRes.data);
            res.send(rpcRes.data);
        }
        else {
            res.send(rpcRes.value);
        }
    });
});

module.exports = profileModule;