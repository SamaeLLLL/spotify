const pool = require('../db');
const path = require('path');

const getPlaylists = async(req, res) => {
    try {
        const cookies = req.cookies;
        if(!cookies?.jwt) return res.statusCode(401);
        const refreshToken = cookies.jwt;
        const getUser = await pool.query("SELECT id FROM users WHERE refresh_token = $1",[refreshToken]);
        if(!getUser.rows[0]?.id) return res.sendStatus(403); // Forbidden
        const savedAlbums = await pool.query("SELECT title, public_playlist, albums.desc, playlist_img, likes, song_amount, length, users.user_img AS author_img, albums.author_id, users.username AS author FROM saved_albums INNER JOIN users ON users.id = saved_albums.user_id INNER JOIN albums ON albums.id = saved_albums.album_id INNER JOIN users AS author_user ON author_user.id = albums.author_id INNER JOIN users AS author_img on author_img.id = albums.author_id WHERE saved_albums.user_id = $1",[getUser.rows[0].id]);
        res.json(savedAlbums.rows)
    } catch (error) {
        console.error("getPlaylists/playlistController: " + error.message);
    }
}

const getAuthorImg = async(req, res) => {
    // Name of the image
    const { authorImg } = req.body;
    if(!authorImg) return (res.sendStatus(400));

    const pathName = path.join(__dirname, '../uploads/profilePictures')
    const options = {
        root: pathName, // specify the directory where the file is located
        headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
        }
    };

    res.sendFile(authorImg, options, (err) => {err ? console.error(err) : ""})
}

const createPlaylist = async(req, res) => {
    try {
        const playlistName = req.body.playlistName;
        if(!playlistName) return res.status(400).json({"message":"The title cannot be empty."})
        if(playlistName.length > 70) return res.status(400).json({"message":"the maximum length of the title has been exceeded."})
        const cookies = req.cookies;
        if(!cookies?.jwt) return res.statusCode(401);
        const refreshToken = cookies.jwt;
        const getUser = await pool.query("SELECT * FROM users WHERE refresh_token = $1",[refreshToken]);
        if (!getUser.rows[0]?.id) return res.sendStatus(403);
        // Create the album
        const createAlbum = await pool.query("INSERT INTO albums (title, author_id, author_img) VALUES ($1, $2, $3) RETURNING *",[playlistName, getUser.rows[0].id, getUser.rows[0].user_img]);
        // Save the album to the users albums
        await pool.query("INSERT INTO saved_albums (user_id, album_id) VALUES ($1, $2)",[getUser.rows[0].id, createAlbum.rows[0].id]);

        res.json({"message" : `Playlist ${createAlbum.rows[0].title} was created successfully`});
    } catch (err) {
        console.log("playlistController/CreatePlaylist: " + err)
    }
}

module.exports = {
    getPlaylists,
    createPlaylist,
    getAuthorImg
}