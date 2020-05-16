const mongoose = require('mongoose');

let mongoURI;

if (process.env.NODE_ENV === 'production') {
  mongoURI = `mongodb+srv://${process.env.dbuser}@dopecluster-oxbyl.mongodb.net/test?retryWrites=true&w=majority`;
} else {
  require('../../secrets');
  mongoURI = 'mongodb://' + process.env.dbuser + '@localhost/dopaliscious';
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
}); //local host db
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log(`
    Connected to dopaliscious db
    `);
});

require('./Models');
module.exports = {
  db,
};
