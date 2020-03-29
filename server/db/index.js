const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dopaliscious'); //local host db
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log(`
    
    connected to dopaliscious db

    `);
});

module.exports = {
  db,
};
