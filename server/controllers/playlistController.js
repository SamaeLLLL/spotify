const pool = require('../db')

const getPlaylists = async(req, res) => {
    try {
        const cookies = req.cookies;
        if(!cookies?.jwt) return res.statusCode(401);
        const refreshToken = cookies.jwt;
        const getUser = await pool.query("SELECT id FROM users WHERE refresh_token = $1",[refreshToken]);
        const savedAlbums = await pool.query("SELECT * FROM saved_albums WHERE user_id = $1",[getUser.rows[0].id]);
        res.json(savedAlbums.rows)
    } catch (error) {
        console.error("getPlaylists/playlistController" + error.message);
    }
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
        const createAlbum = await pool.query("INSERT INTO saved_albums (title, user_id, author, author_img) VALUES ($1, $2, $3, $4) RETURNING *",[playlistName, getUser.rows[0].id, getUser.rows[0].username, getUser.rows[0].user_img]);
        console.log(createAlbum)
        res.json({"message" : `Playlist ${createAlbum.rows[0].title} was created successfully`});
    } catch (err) {
        console.log("playlistController/CreatePlaylist: " + err)
    }
}

module.exports = {
    getPlaylists,
    createPlaylist
}