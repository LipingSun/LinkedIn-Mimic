var express = require('express');
var mysql = require('./mysql');
var router = express.Router();


router.post('/', function(req, res, next) {
    console.log(req.body);
    var sql = "INSERT INTO user (email, password, firstname, lastname) VALUES ('" + req.body.email + "', '" + req.body.password + "', '" + req.body.firstname + "', '" + req.body.lastname + "')";
    console.log(sql);
    mysql.fetchData(sql, function (err, row) {
        console.log(row[0]);
        res.send(row[0]);
    });

});

module.exports = router;