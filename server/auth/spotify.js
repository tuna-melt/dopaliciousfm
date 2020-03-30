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
  function(req, res) {
    // Successful authentication, redirect home.
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
      console.log(profile);
      User.findOrCreate(
        { name: profile.display_name, spotifyId: profile.id },
        function(err, user) {
          return done(err, user);
        }
      );
    }
  )
);

module.exports = router;
