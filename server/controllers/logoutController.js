const pool = require("../db");

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies
    if (!cookies?.jwt ) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt

    const foundUser = await pool.query("SELECT * FROM users WHERE refresh_token=$1", [refreshToken]);
    const userExists = foundUser.rows.length > 0
    if (!userExists) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        res.sendStatus(204); // No content  
    } 

    // Delete refresh_token (User Logout)

    const deleteToken = await pool.query("UPDATE users SET refresh_token=$1 WHERE refresh_token=$2 RETURNING *", [null, refreshToken]);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }