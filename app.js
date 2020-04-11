var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var mongoose      = require('mongoose');
var passport      = require('passport');
var localStrategy = require('passport-local');
var session       = require('express-session');
var bodyParser    = require('body-parser');
const hbs         = require('hbs');
var flash		  = require('connect-flash');


var indexRouter 		  = require('./routes/index');
var usersRouter 		  = require('./routes/users');
var companiesRouter 	  = require('./routes/companies');
var internRouter		  = require('./routes/Internship');
var SIWESRouter	 	 	  = require('./routes/SIWES');
var loginRouter			  = require('./routes/login');
var registerRouter		  = require('./routes/register');
var adminRouter   		  = require('./routes/admin');
var companyIDRouter 	  = require('./routes/companyID');
var contactRouter		  = require('./routes/contact');
var subscribeRouter		  = require('./routes/subscribe');
var servicesRouter		  = require('./routes/services');


// var authRouter            = require('./public/auth');
// var authUtils			  = require('./utils/auth');

var app = express();

//connect to mongodb
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/ITx').then((err) => {
	useNewUrlParser: true;
	if (err) {
		throw err;
	}

	const users 		= db.collection('users');
	const companies 	= db.collection('companies');
	const admin 		= db.collection('admin');
	const companyID 	= db.collection('companyID');
	app.locals.users 	= users;
	app.locals.companyID = companyID;
	app.locals.companies = companies;
	app.locals.admin 	= admin;
});

passport.use(new localStrategy(
	(email, password, done) => {
		app.locals.users.findOne({ email }, (err, user) => {
		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false);
		}

		if (user.password != authUtils.hashPassword(password)) {
			return done(null, false);
		}

		return done(null, user);
	}).catch((err) => {
		console.log("Not connected to database. ERROR!!", err);
		});

		passport.serializeUser((user, done) => {
			done(null, user._id);
		});

		passport.deserializeUser((id, done) => {
			done(null, { id });
		});


	app.locals.companyID.findOne
	app.locals.admin.findOne
	}
))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:             'secret session',
    resave:             false,
    saveUninitialized:  false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	next();
});

//Requiring Route
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/services/companies', companiesRouter);
app.use('/services/SIWES', SIWESRouter);
app.use('/services/Internship', internRouter);
app.use('/admin', adminRouter);
app.use('/services', servicesRouter);
app.use('/subscribe', subscribeRouter);
app.use('/contact', contactRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/companyID', companyIDRouter);
// app.use('/auth', authRouter);
// app.use('/auth/login', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
