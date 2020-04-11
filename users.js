var express = require('express');
var router = express.Router();
const ObjectID = require('mongoose').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }

  const  user = req.app.locals.users;
  const _id = ObjectID(req.session.passport.user);

  users.findOne({ _id }, (err, results) => {
    if (err) {
      throw err;
    }
    results.render('account', {...results});
  });
});

router.get('/:username', (req, res, next) => {
  const users = req.app.locals.users;
  const email = req.params.email


  users.findOne({ email }, (err, results) => {
    if (err || !results) {
      res.render('users', { messages: {error: ['User not found']}});
    }

    res.render('users', {...results, email}, { title: 'Profile'});

  })
})

router.post('/', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }

  const user = req.app.locals.users;
  // const { name,  }
})

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.render('/');
});

module.exports = router;
