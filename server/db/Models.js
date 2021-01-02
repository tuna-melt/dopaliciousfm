const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: String,
  name: String,
  spotifyId: String,
  imageURL: String,
  accessToken: String,
  refreshToken: String,
  tokenExpiration: Number,
})

UserSchema.statics.findOrCreate = function findOrCreate(condition, callback) {
  const self = this
  self.findOne(condition, (err, result) => {
    return result
      ? callback(err, result)
      : self.create(condition, (err, result) => {
          return callback(err, result)
        })
  })
}

UserSchema.pre("save", function (next) {
  const user = this
  if (!user.isModified("password")) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    // hash the password using salt
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return err
    return isMatch
  })
}

module.exports = mongoose.model("User", UserSchema)

const CommentSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
})

module.exports = mongoose.model("Comment", CommentSchema)

const ReactionSchema = new Schema({
  content: String,
  imgURL: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: { type: Schema.Types.ObjectId, ref: "Comment" },
})

module.exports = mongoose.model("Reaction", ReactionSchema)

const PlaylistSchema = new Schema({
  spotifyURI: String,
})

module.exports = mongoose.model("Playlist", PlaylistSchema)
