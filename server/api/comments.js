const router = require("express").Router()
const Comment = require("mongoose").model("Comment")

router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find({}).populate("user")
    res.send(comments)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    if (req.user._id) {
      const { content } = req.body
      const comment = { content, user: req.user._id }
      const newComment = await Comment.create(comment)
      res.send(await Comment.findOne({ _id: newComment._id }).populate("user"))
    } else {
      const err = new Error("Must be logged In")
      throw err
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
