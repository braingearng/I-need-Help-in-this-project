var express = require('express');
var router = express();
const flash = require('connect-flash');
router.use(flash());





router.get('/', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.render('Internship', {title: "Internship"});
    }
});

module.exports = router;
