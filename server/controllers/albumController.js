const pool = require('../db');


// Get all songs from a playlist
const getAllSongs = async (req, res) => {
    try {
        const {playlist_name} = req.params;
        if(!playlist_name) return res.sendStatus(400);

        const parseDB = await pool.query("SELECT songs.track_id AS song_id, songs.title, songs.release, songs.artist_name, songs.year, songs.duration, date_added  FROM album_songs INNER JOIN songs on album_songs.song_id = songs.track_id INNER JOIN albums ON albums.id = album_songs.album_id WHERE albums.title = $1",[playlist_name]); 
        res.status(200).json(parseDB.rows);
    } catch (error) {
        console.error("albumController/getAllSongs: " + error);
    }
}



// Add a song to an album
const addSong = async( req, res ) => {
    try {
        const { song_id, playlist_id } = req.body;
        if (!song_id || !playlist_id ) return res.sendStatus(400) // Invalid request

        const currentDate = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const addSong = await pool.query("INSERT INTO album_songs (album_id, song_id, date_added) VALUES ($1, $2, $3)", [playlist_id, song_id, currentDate]);
        res.sendStatus(200) // OK
    
    } catch (error) {
        console.error("albumController/addSong: " + error)
    }
}

// Remove a song from an album
const removeSong = async( req, res ) => {
    try {
        const { song_id } = req.body;
        const { playlist_name } = req.params;
        if (!song_id || !playlist_name ) return res.sendStatus(400) // Invalid request

        const currentDate = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const fetch_id = await pool.query("SELECT album_id FROM album_songs INNER JOIN albums ON albums.id = album_songs.album_id WHERE title = $1",[playlist_name]);
        const playlist_id = fetch_id.rows[0].album_id;
        const deleteSong = await pool.query("DELETE FROM album_songs WHERE album_id = $1 AND song_id = $2", [playlist_id, song_id]);
        
        res.json({"success":`Song with the id ${song_id} has been added sucessfully deleted!`})
    
    } catch (error) {
        console.error("albumController/removeSong: " + error)
    }
}

module.exports = {
    addSong,
    removeSong,
    getAllSongs
}