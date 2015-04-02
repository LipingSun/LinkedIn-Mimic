var express = require('express');
var session = require('express-session');
var rpc = require('amqp-rpc').factory({
    url: "amqp://guest:guest@127.0.0.1:5672"
});

var memberModule = {};

memberModule.searchMember = express.Router();
memberModule.sendInvitation = express.Router();
memberModule.acceptInvitation = express.Router();

memberModule.searchMember.get('/', function(req, res) {
    console.log('search: ' + req.query.name);
    var rpcReq = {
        service: 'searchMember',
        message: req.query
    };
    rpc.call('memberServiceQueue', rpcReq, function(rpcRes) {
        if (rpcRes.success === true) {
            console.log('results:', rpcRes.data);
            res.send(rpcRes.data);
        }
        else {
            res.send(rpcRes.value);
        }
    });
});

memberModule.sendInvitation.get('/', function(req, res) {
    var rpcReq = {
        service: 'sendInvitation',
        message: req.query
    };
    rpc.call('memberServiceQueue', rpcReq, function(rpcRes) {
        if (rpcRes.success === true) {
            console.log('results:', rpcRes.data);
            res.send(rpcRes.data);
        }
        else {
            res.send(rpcRes.value);
        }
    });
});

memberModule.acceptInvitation.get('/', function(req, res) {
    console.log('search: ' + req.query.name);
    var rpcReq = {
        service: 'acceptInvitation',
        message: req.query
    };
    rpc.call('memberServiceQueue', rpcReq, function(rpcRes) {
        if (rpcRes.success === true) {
            console.log('results:', rpcRes.data);
            res.send(rpcRes.data);
        }
        else {
            res.send(rpcRes.value);
        }
    });
});

module.exports = memberModule;