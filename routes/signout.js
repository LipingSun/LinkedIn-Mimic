var express = require('express');
var session = require('express-session');

var router = express.Router();

router.all('/', function(req, res, next) {
    req.session.destroy();
    res.location('/');
    res.render('index');
});

module.exports = router;