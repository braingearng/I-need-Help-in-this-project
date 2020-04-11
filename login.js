var express = require('express');
var router = express();
const flash = require('connect-flash');
router.use(flash());
var passport = require("passport");
var local     = require('passport-local');



router.get('/', function(req, res, next) {
    const messages = req.flash();
    res.render('login', { title: 'Login', });
});

router.post('/login',
    passport.authenticate('local',
        {failureFlash: "Wrong email or password"}), (req, res, next) => {
    res.redirect('/user/' + req.user.email)
});
module.exports = router;