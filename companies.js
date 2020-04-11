var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    } else
        res.render('companies1');
});

router.get('/', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    } else
        res.render('companies2');
});

module.exports = router;