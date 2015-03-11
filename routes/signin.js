var express = require('express');
var mysql = require('./mysql');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log('req: ' + JSON.stringify(req.body));
    var sql = 'SELECT * FROM user WHERE email="' + req.body.email + '"';
    mysql.query(sql, function (err, data) {
        //console.log(data[0]);
        if (req.body.password === data[0].password) {
            res.location('/home');
            console.dir(res.header);
            res.end();
            //res.end('Success');
        } else {
            res.send("Log in failed");
        }
    });
});

module.exports = router;