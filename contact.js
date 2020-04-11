var express = require('express');
var router = express();
const flash = require('connect-flash');
router.use(flash());



router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
});

module.exports = router;