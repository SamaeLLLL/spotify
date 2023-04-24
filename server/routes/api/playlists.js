const express = require('express');
const router = express.Router();
const playlistController = require("../../controllers/playlistController");

router.route('/')
    .get(playlistController.getPlaylists)
    .post(playlistController.createPlaylist)
    // .put(userController.updateUser)
    // .delete(userController.deleteUser);


module.exports = router;