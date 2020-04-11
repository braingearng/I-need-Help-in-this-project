var express = require('express');
var router = express();
const flash = require('connect-flash');
router.use(flash());



router.get('/', (req, res, next) => {

		res.render('index', { title: 'Brain Gear' });
});

module.exports = router;
