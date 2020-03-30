const router = require('express').Router();
const Comment = require('mongoose').model('Comment');

router.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.find({}).populate('user');
    res.send(comments);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { newComment } = req.body;
    const comment = await Comment.create({ newComment });
    console.log(comment);
    res.send(comment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
