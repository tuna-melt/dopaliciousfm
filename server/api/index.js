const router = require('express').Router();

router.use('/comments', require('./comments'));

module.exports = router;
