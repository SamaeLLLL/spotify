const pool = require('../db');
const path = require('path');

const search = async(req, res) => {
    try {
        const searchQuery = req.query.query;
        if(!searchQuery) return res.sendStatus(400);
        const fetchDB = await pool.query("SELECT * FROM songs WHERE (lower(title) LIKE lower($1)) OR (lower(artist_name) LIKE lower($1)) LIMIT 100",["%" + searchQuery + "%"]);
        if(!fetchDB.rows) return res.sendStatus(401);
        res.json(fetchDB.rows);
    } catch (error) {
        console.error("searchController/search: " + error.message);
    }
}


module.exports = {
    search,
}