const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  spotifyId: Int32Array,
});

module.exports = mongoose.model('User', UserSchema);

const CommentSchema = new Schema(
  {
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { capped: { size: 1024, max: 100, autoIndexId: true } }
);

module.exports = mongoose.model('Comment', CommentSchema);

const ReactionSchema = new Schema({
  content: String,
  imgUrl: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
});

module.exports = mongoose.model('Reaction', ReactionSchema);
