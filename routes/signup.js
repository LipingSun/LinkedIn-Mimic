var express = require('express');
var mysql = require('./mysql');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('sdfas' );
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    var sql = "INSERT INTO user (user_id, email, password, firstname, lastname) VALUES ('2', '" + req.body.email + "', '" + req.body.password + "', '" + req.body.firstname + "', '" + req.body.lastname + "')";
    console.log(sql);
    mysql.fetchData(sql, function (err, row) {
        console.log(row[0]);
        res.send(row[0]);
    });

});

module.exports = router;