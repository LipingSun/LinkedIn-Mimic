var express = require('express');
var session = require('express-session');
var rpc = require('amqp-rpc').factory({
    url: "amqp://guest:guest@127.0.0.1:5672"
});

var memberModule = {};

memberModule.searchMember = express.Router();

memberModule.searchMember.get('/', function(req, res) {
    console.log('search: ' + req.query.name);
    var rpcReq = {
        service: 'searchMember',
        message: req.query
    };
    rpc.call('memberServiceQueue', rpcReq, function(rpcRes) {
        res.send(rpcRes);
        console.log('results:', rpcRes);
    });
});

module.exports = memberModule;