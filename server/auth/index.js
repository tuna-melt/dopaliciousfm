const router = require('express').Router();

// Request Dependancies
const axios = require('axios');
const QueryString = require('query-string');
const btoa = require('btoa');

// User Model
const User = require('mongoose').model('User');

// Spotify Auth
router.use('/spotify', require('./spotify'));

router.get('/me', async (req, res, next) => {
  try {
    if (req.user && req.user._id) {
      if (req.user.tokenExpiration < Date.now()) {
        const options = {
          method: 'post',
          url: 'https://accounts.spotify.com/api/token',
          data: QueryString.stringify({
            grant_type: 'refresh_token',
            refresh_token: req.user.refreshToken,
          }),
          headers: {
            Authorization: `Basic ${btoa(
              process.env.SPOTIFYCLIENTID +
                ':' +
                process.env.SPOTIFYCLIENTSECRET
            )}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
        const { data } = await axios(options);

        const user = await User.findById(req.user._id);
        user.tokenExpiration = Date.now() + (data.expires_in - 5) * 1000;
        user.accessToken = data.access_token;

        await user.save();

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
