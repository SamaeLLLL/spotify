const pool = require("../db");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt ) return res.sendStatus(401);
    const refreshToken = cookies.jwt

    const foundUser = await pool.query("SELECT * FROM users WHERE refresh_token=$1", [refreshToken]);
    const userExists = foundUser.rows.length > 0
    if (!userExists) return res.status(403).json({"message":"User not found"})


    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || (foundUser.rows[0].email).toLowerCase() !== (decoded.username).toLowerCase() ) return res.status(403).send(err);
            const accessToken = jwt.sign(
                { "username" : decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({accessToken})
        }
    )


}

module.exports = { handleRefreshToken }