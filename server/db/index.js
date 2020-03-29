const mongoose = require('mongoose');
const mongoURI = 'mongodb://' + process.env.dbuser + '@localhost/dopaliscious';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //local host db
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log(`
    Connected to dopaliscious db
    `);
});

const { User, Comment, Reaction } = require('./Models');

module.exports = {
  db,
  User,
  Comment,
  Reaction,
};
