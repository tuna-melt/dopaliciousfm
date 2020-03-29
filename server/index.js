// Basic Routes
const path = require('path');
const express = require('express');
const app = express();

// Default port is 3000
const PORT = process.env.PORT || 3000;

// Logging Middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// JSON request body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Middleware
app.use(express.static(path.join(__dirname, '../public')));

// Route catchall
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Set server to listen on PORT
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
