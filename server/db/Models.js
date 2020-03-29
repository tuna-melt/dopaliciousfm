const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  spotifyId: String,
});

const User = mongoose.model('User', UserSchema);

const CommentSchema = new Schema(
  {
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { capped: { size: 1024, max: 100, autoIndexId: true } }
);

const Comment = mongoose.model('Comment', CommentSchema);

const ReactionSchema = new Schema({
  content: String,
  imgUrl: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
});

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = {
  User,
  Reaction,
  Comment,
};
