const router = require('express').Router();

router.use('/spotify', require('./spotify'));

router.get('/me', (req, res, next) => {
  try {
    if (req.user._id) {
      res.send(req.user);
    } else {
      res.send({});
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
