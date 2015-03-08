var express = require('express');
var mysql = require('./mysql');
var router = express.Router();


router.post('/', function(req, res, next) {
    console.log(req.body);
    var sql = "SELECT " + req.body.email + " FORM user";
    console.log(sql);
    mysql.fetchData(sql, function (err, row) {
        console.log(row[0]);
        if (req.body.password === row[0].password) {
            res.send("Log in success");
        } else {
            res.send("Log in failed");
        }
    });
});

module.exports = router;