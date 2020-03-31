const router = require('express').Router();
const User = require('mongoose').model('User');
require('../../secrets');

const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

router.get(
  '/',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
  })
);

router.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  async function(req, res) {
    // Successful authentication, add refresh code to user and redirect
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { code: req.query.code }
    );
    res.redirect('/');
  }
);

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFYCLIENTID,
      clientSecret: process.env.SPOTIFYCLIENTSECRET,
      callbackURL: 'http://localhost:3000/auth/spotify/callback',
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate(
        {
          name: profile.displayName,
          spotifyId: profile.id,
          imageURL: profile.photos[0],
        },
        function(err, user) {
          return done(err, user);
        }
      );
    }
  )
);

module.exports = router;