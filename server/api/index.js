const router = require("express").Router()

router.use("/comments", require("./comments"))

router.use("/playlists", require("./playlists"))

module.exports = router
