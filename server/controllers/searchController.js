const pool = require('../db');
const path = require('path');

const search = async(req, res) => {
    try {
        const searchQuery = req.query.query;
        if(!searchQuery) return res.sendStatus(400);
        let fetchDB;
        if(searchQuery.includes(" ")) { 
            const splitQuery = splitString(searchQuery);
            // [0] -> title (SNAD HOPEFULLY)
            // [1] -> artist (PLEASE)
            fetchDB = await pool.query("SELECT * FROM songs WHERE (lower(title) LIKE lower($1) AND lower(artist_name) LIKE (lower($2))) LIMIT 100",["%" + splitQuery[0] + "%", "%" + splitQuery[1] + "%"]);
            if(fetchDB.rows.length === 0) {
                fetchDB = await pool.query("SELECT * FROM songs WHERE (lower(title) LIKE lower($1)) OR (lower(artist_name) LIKE lower($1)) LIMIT 100",["%" + searchQuery + "%"]);
            } 
         } else {
            fetchDB = await pool.query("SELECT * FROM songs WHERE (lower(title) LIKE lower($1)) OR (lower(artist_name) LIKE lower($1)) LIMIT 100",["%" + searchQuery + "%"]);
         }
        if(!fetchDB.rows) return res.sendStatus(401);
        res.json(fetchDB.rows);
    } catch (error) {
        console.error("searchController/search: " + error.message);
    }
}

function splitString(str) {
    const lastSpaceIndex = str.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) { // if space is found
      const firstSubstring = str.substring(0, lastSpaceIndex);
      const secondSubstring = str.substring(lastSpaceIndex + 1);
      return [firstSubstring, secondSubstring];
    } else { // if no space is found
      return [str];
    }
  }

module.exports = {
    search,
}