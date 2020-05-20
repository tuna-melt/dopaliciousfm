const router = require('express').Router();
const User = require('mongoose').model('User');
process.env.NODE_ENV !== 'production' && require('../../secrets');

const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

router.get(
  '/',
  passport.authenticate('spotify', {
    scope: [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-modify-playback-state',
    ],
  })
);

router.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home
    res.redirect('/');
  }
);

let callback;

if (process.env.NODE_ENV === 'production') {
  callback = 'https://dopaliscious.us/auth/spotify/callback';
} else {
  callback = 'http://localhost:3000/auth/spotify/callback';
}

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFYCLIENTID,
      clientSecret: process.env.SPOTIFYCLIENTSECRET,
      callbackURL: callback,
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate(
        {
          name: profile.displayName,
          spotifyId: profile.id,
          imageURL: profile.photos[0],
          accessToken,
          refreshToken,
          tokenExpiration: (expires_in - 5) * 1000 + Date.now(),
        },
        function(err, user) {
          return done(err, user);
        }
      );
    }
  )
);

module.exports = router;
