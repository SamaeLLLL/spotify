const express = require('express');
const router = express.Router();
const albumController = require("../../controllers/albumController");

router.route('/')
.post(albumController.addSong)


router.route('/:playlist_name')
    .get(albumController.getAllSongs)
    .delete(albumController.removeSong)



module.exports = router;