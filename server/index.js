// Basic Routes
require('../secrets');
const path = require('path');
const express = require('express');
const { db } = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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

app.use('/api', require('./api'));

// Route catchall
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
