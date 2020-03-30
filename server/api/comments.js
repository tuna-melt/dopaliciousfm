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
    const { comment } = req.body;
    let newComment = await Comment.create({ comment });
    newComment = Comment.find({ _id: newComment._id }).populate('user');
    res.send(newComment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
