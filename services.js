var express = require('express');
var router = express();
const flash = require('connect-flash');
router.use(flash());



router.get('/', function(req, res, next) {
    res.render('services', { title: 'Services' });
});

router.get('/services/SIWES', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.render('SIWES', {title: "SIWES"});
    }
})

router.get('/services/Internship', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.render('Internship', {title: "Internship"});
    }
})

module.exports = router;
