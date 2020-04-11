var express = require('express');
var router = express();
const flash = require('connect-flash');
router.use(flash());




router.get('/', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/login')
    }
    else
        res.render('SIWES', {title: "SIWES"})
});

module.exports = router;