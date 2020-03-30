const router = require('express').Router();
const Comment = require('mongoose').model('Comment');

router.get('/', async (req, res, next) => {
  const comments = await Comment.find({}).populate('user');
  res.send(comments);
});

module.exports = router;
