const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleNewUser = async (req, res) => {
    const { user, pwd, email, confirmEmail } = req.body;
    if (!user || !pwd || !email || !confirmEmail) return res.status(400).json({'mesasge': 'Email, username and password required!'});
    if (user.length > 30 || user.length < 5) return res.status(400).json({"message":"Username not within length limits."})
    if (email.length > 50 || email.length < 5) return res.status(400).json({"message":"Email not within length limits."})
    if (pwd.length > 250 || pwd.length < 7) return res.status(400).json({"message":"Password not within length limits."})

    if(!(email === confirmEmail)) return res.status(400).json({"message":"Emails are not matching."})

    // Check for duplicate usernames in DB
    const checkDuplicate = await pool.query("SELECT * FROM users WHERE LOWER(email)=LOWER($1)", [email]);
    const duplicate = checkDuplicate.rows.length > 0;
    if (duplicate) return res.status(409).json({"message":"Email already registered!"});
    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 15);

        // Store the new user
        const newUser = await pool.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *", [user, hashedPwd, email]);

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

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        pool.query("UPDATE users SET refresh_token=$1 WHERE email=$2", [refreshToken, email]);
        res.status(200).json({ accessToken });

    } catch (error) {
        res.status(500).json({"message": error.mesasge});
    }
}

module.exports = { handleNewUser };