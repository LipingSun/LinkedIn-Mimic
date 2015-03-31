var loginService = require('./services/login_service');
var rpc = require('amqp-rpc').factory({
    url: "amqp://guest:guest@127.0.0.1:5672"
});

rpc.on('loginService', function(rpcReq, callback){
    console.log(rpcReq);
    if (rpcReq.service === 'signin') {
        loginService.signin(rpcReq.message, function(err,rpcRes){
            callback(rpcRes);
        });
    }

});