const express = require('express');
const router = express.Router();
const likedSongsController = require("../../controllers/likedSongsController");

router.route('/')
    .get(likedSongsController.getLikedSongs)
    .post(likedSongsController.saveLikedSong)
    .delete(likedSongsController.deleteLikedSong);

// router.route('/authorImg')
//     .post(playlistController.getAuthorImg)


module.exports = router;