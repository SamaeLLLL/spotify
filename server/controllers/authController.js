const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd ) return res.status(400).json({'mesasge': 'Username and password required!'});

    const foundUser = await pool.query("SELECT * FROM users WHERE LOWER(email)=LOWER($1)", [user]);
    const userExists = foundUser.rows.length > 0
    if (!userExists) return res.status(401).json({"message":"Username does not exist"});
    const hashedPwd = await pool.query("SELECT password FROM users WHERE LOWER(email)=LOWER($1)", [user]);
    // Check password
    const hashedPwdSanitized = hashedPwd.rows[0]?.password;
    const match = await bcrypt.compare(pwd, hashedPwdSanitized);
    if (match) {
        // create JWT
        const accessToken = jwt.sign(
            { "username": user },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
            { "username": user },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        // Update the user and add the refresh token
        await pool.query("UPDATE users SET refresh_token=$1 WHERE LOWER(email) = LOWER($2) RETURNING *", [refreshToken, user]);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ accessToken });
    } else {
        res.status(401).json({"Message":"Password is incorrect"});
    }
}

module.exports = { handleLogin }