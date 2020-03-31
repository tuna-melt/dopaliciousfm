const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  spotifyId: String,
  imageURL: String,
  accessToken: String,
  refreshToken: String,
});

UserSchema.statics.findOrCreate = function findOrCreate(condition, callback) {
  const self = this;
  self.findOne(condition, (err, result) => {
    return result
      ? callback(err, result)
      : self.create(condition, (err, result) => {
          return callback(err, result);
        });
  });
};

module.exports = mongoose.model('User', UserSchema);

const CommentSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Comment', CommentSchema);

const ReactionSchema = new Schema({
  content: String,
  imgURL: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
});

module.exports = mongoose.model('Reaction', ReactionSchema);
