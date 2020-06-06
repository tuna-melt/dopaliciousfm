const { db } = require('../server/db');

const User = db.model('User');
const Comment = db.model('Comment');
const Reaction = db.model('Reaction');

// Find and drop all collection
User.collection.drop();
Comment.collection.drop();
// Reaction.collection.drop();

const runSeed = async () => {
  const users = await User.create([
    {
      name: 'Dante',
      email: 'dante@email.com',
    },
    {
      name: 'Diego',
      email: 'diego@email.com',
    },
    {
      name: 'Luna',
      email: 'luna@email.com',
    },
  ]);

  const comments = await Comment.create([
    {
      content: 'hi',
      user: users[0]._id,
    },
    {
      content: 'hello',
      user: users[1]._id,
    },
    {
      content: 'oh hey',
      user: users[2]._id,
    },
  ]);
};

runSeed().then(() => db.close());
