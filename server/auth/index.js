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
    if (req.user && req.user._id) {
      if (req.user.tokenExpiration < Date.now()) {
        const user = await refreshUserToken(req.user);
        res.send(user);
      } else {
        res.send(req.user);
      }
    } else {
      res.send({});
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
