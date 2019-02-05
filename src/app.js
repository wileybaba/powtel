const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const validator = require('express-validator');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const app = express();

// .env for environment variables
require('dotenv').config();

// mongo connection
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("We're connected to " + mongoDB);
});

app.use(flash());

// use sessions for tracking logins
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: 'shredding is life',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  }),
);

// passport config
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// parese incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from /public
app.use(express.static('public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// routing
const index = require('./routes/index');
const auth = require('./routes/auth')(passport);
const api = require('./routes/api');
const region = require('./routes/region');
const location = require('./routes/location');
const admin = require('./routes/admin');

app.use('/', index);
app.use('/auth', auth);
app.use('/api', api);
app.use('/region', region);
app.use('/location', location);
app.use('/admin', admin);

// setting up data fetches
const fetchWeather = require('./fetchWeather');
const fetchSnoCountry = require('./fetchSnoCountry');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
