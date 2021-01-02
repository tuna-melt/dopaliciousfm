const router = require('express').Router();

// Request Dependancies
const axios = require('axios');
const QueryString = require('query-string');
const btoa = require('btoa');

// User Model
const User = require('mongoose').model('User');

// Spotify Auth
router.use('/spotify', require('./spotify'));

const refreshUserToken = async user => {
  const options = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: QueryString.stringify({
      grant_type: 'refresh_token',
      refresh_token: user.refreshToken,
    }),
    headers: {
      Authorization: `Basic ${btoa(
        process.env.SPOTIFYCLIENTID + ':' + process.env.SPOTIFYCLIENTSECRET
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const { data } = await axios(options);

  const refreshUser = await User.findById(user._id);
  refreshUser.tokenExpiration = Date.now() + (data.expires_in - 5) * 1000;
  refreshUser.accessToken = data.access_token;

  await refreshUser.save();

  return refreshUser;
};

router.get('/me', async (req, res, next) => {
  try {
    if (req.user && req.user.spotifyId) {
      if (req.user.tokenExpiration < Date.now()) {
        const user = await refreshUserToken(req.user);
        res.send(user);
      } else {
        res.send(req.user);
      }
    } else {
      res.send(req.user);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  const isAuthed = user.comparePassword(password);

  if (isAuthed === false) {
    res.sendStatus(403);
  } else {
    req.login(user, err => (err ? next(err) : res.redirect('/auth/me')));
  }
});

router.post('/signup', async (req, res, next) => {
  const { email, name, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.sendStatus(404);
  } else {
    user = await User.create({ email, name, password });
    req.login(user, err => (err ? next(err) : res.redirect('/auth/me')));
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
