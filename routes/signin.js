var express = require('express');
var mysql = require('./mysql');
var router = express.Router();


router.post('/', function(req, res, next) {
    console.log(req.body);
    var sql = 'SELECT * FROM user WHERE email="' + req.body.email + '"';
    console.log(sql);
    mysql.query(sql, function (err, data) {
        console.log(data[0]);
        if (req.body.password === data[0].password) {
            res.send("Log in success");
        } else {
            res.send("Log in failed");
        }
    });
});

module.exports = router;