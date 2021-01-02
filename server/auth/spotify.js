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
    async function(accessToken, refreshToken, expires_in, profile, done) {
      let user = await User.findOne({ email: profile._json.email });
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: profile._json.email,
          spotifyId: profile.id,
          imageURL: profile.photos[0],
          accessToken,
          refreshToken,
          tokenExpiration: expires_in * 1000 + Date.now(),
        });
      }
      return done(null, user);
    }
  )
);

module.exports = router;
