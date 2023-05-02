const pool = require('../db');
const path = require('path');

const getLikedSongs = async(req, res) => {
    try {

        // Get user refresh token
        const cookies = req.cookies;
        if(!cookies?.jwt) return res.statusCode(401);
        const refreshToken = cookies.jwt;

        // Get user based on refresh token
        const getUser = await pool.query("SELECT id FROM users WHERE refresh_token = $1",[refreshToken]);
        if(!getUser.rows[0]?.id) return res.sendStatus(403); // Forbidden

        const likedSongs = await pool.query("SELECT * FROM liked_songs INNER JOIN songs ON songs.track_id = liked_songs.song_id WHERE user_id = $1",[getUser.rows[0].id]);
        res.json(likedSongs.rows);
    } catch (error) {
        console.error("likedSongsController/getLikedSongs: " + error.message);
    }
}

const saveLikedSong = async (req, res) => {
    try {
        const { song_id } = req.body;
        if (!song_id) return res.statusCode(401);
        const cookies = req.cookies;
        if(!cookies?.jwt) return res.statusCode(401);
        const refreshToken = cookies.jwt;

        // Get user based on refresh token
        const getUser = await pool.query("SELECT id FROM users WHERE refresh_token = $1",[refreshToken]);
        if(!getUser.rows[0]?.id) return res.sendStatus(403); // Forbidden

        console.log(song_id)
        const currentDate = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
        const response = await pool.query("INSERT INTO liked_songs (user_id, song_id, date_added) VALUES ($1, $2, $3) RETURNING *",[getUser.rows[0].id, song_id, currentDate]);

        res.json(response.rows[0])

    } catch (error) {
        console.error("likedSongsController/saveLikedSong: " + error.message);
    }
}

const deleteLikedSong = async (req, res) => {
    try {
        const { song_id } = req.body;
        const cookies = req.cookies;
        if(!cookies?.jwt) return res.statusCode(401);
        const refreshToken = cookies.jwt;

        // Get user based on refresh token
        const getUser = await pool.query("SELECT id FROM users WHERE refresh_token = $1",[refreshToken]);
        if(!getUser.rows[0]?.id) return res.sendStatus(403); // Forbidden

        const response = await pool.query("DELETE FROM liked_songs WHERE user_id=$1 AND song_id=$2",[getUser.rows[0].id, song_id]);

        res.json({"success":`Song with the id ${song_id} has been added sucessfully deleted!`})

    } catch (error) {
        console.error("likedSongsController/saveLikedSong: " + error.message);
    }
}




module.exports = {
    getLikedSongs,
    saveLikedSong,
    deleteLikedSong
}