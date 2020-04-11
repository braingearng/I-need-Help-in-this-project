var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.use(express.json());

router.get('/', (req, res) => {
    const messages = req.flash();
    res.render('register', { messages, title: "Registration" });
});

router.post('/register', (req, res, next) => {
    var registrationParams  = req.body;
    const user = req.app.locals.user;

    //adding a new user
    var payload = {
        email: registrationParams.email,
        password: authUtils.hashPassword(registrationParams.password),
        firstName:      registrationParams.firstName,
        surName:        registrationParams.surName,
        Gender:         registrationParams.Gender,
        DOB:            registrationParams.DOB,
        phoneNumber:    registrationParams.phoneNumber,
        Marital:        registrationParams.Marital,
        Address:        registrationParams.Address,
        State:          registrationParams.State,
        Institution:    registrationParams.Institution,
        Department:     registrationParams.Department,
        level:          registrationParams.level,
        DP:             registrationParams.DP,
        created:        {
            type:       Date,
            default:    Date.now()
        }
    };
    console.log(payload);
    payload.save();
    user.insertOne(payload, (err) => {
        if (err) {
            req.flash('error', 'User account already exists');
        } else {
            req.flash('success', 'User account was registered successfully!!');
            res.render('register', {title: "Registration"});
        }
    });

});



module.exports = router;