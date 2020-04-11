var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {

    res.render('subscribe', { title: 'Subscription' });
});

module.exports = router;