// Basic Routes
require('../secrets');
const path = require('path');
const express = require('express');
const { db } = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.model('User').find({ _id: id });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Default port is 3000
const PORT = process.env.PORT || 3000;

// Set server to listen on PORT
const app = express();
const server = app.listen(PORT, () => {
  console.log(
    `

    Listening on port ${PORT}
  `
  );
});

// Set socket connection
const io = require('socket.io')(server);
require('./socket')(io);

// Logging Middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// JSON request body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db }),
  })
);

// Static Middleware
app.use(express.static(path.join(__dirname, '../public')));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

// Route catchall
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
