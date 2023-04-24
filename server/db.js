const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "CarBicepsRECA15",
    host: "localhost",
    port: 5432,
    database: "spotify"
})

module.exports = pool;