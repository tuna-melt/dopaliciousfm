const router = require("express").Router()
const Playlist = require("mongoose").model("Playlist")

router.get("/", async (req, res, next) => {
  try {
    const playlists = await Playlist.find({})
    res.send(playlists)
  } catch (err) {
    next(err)
  }
})

module.exports = router
