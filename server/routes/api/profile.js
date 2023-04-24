const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profileController');

// router.route('/')
    // .get()
    // .post(playlistController.createPlaylist)
    // .put(userController.updateUser)
    // .delete(userController.deleteUser);

router.route('/picture')
    .get(profileController.getPP)
    .post(profileController.uploadPP)

module.exports = router;