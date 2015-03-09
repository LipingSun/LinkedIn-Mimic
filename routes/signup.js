var express = require('express');
var mysql = require('./mysql');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.body);
    var sql = "INSERT INTO user (email, password, firstname, lastname) VALUES ('" + req.body.email + "', '" + req.body.password + "', '" + req.body.firstname + "', '" + req.body.lastname + "')";
    console.log(sql);
    mysql.query(sql, function (err, data) {
        console.log(data);
        res.send("db good");
    });
});

module.exports = router;