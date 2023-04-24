const pool = require('../db')

const getAllUsers = async (req, res) => {
    users = await pool.query("SELECT * FROM USERS");
    res.json(users.rows);
}

const getUser = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt ) return res.sendStatus(403); // No content
    const refreshToken = cookies.jwt;
    user = await pool.query("SELECT * FROM USERS WHERE refresh_token = $1", [refreshToken]);

    res.json(user.rows[0])
}

const createNewUser = async(req, res) => {
    const { username } = req.body;
    const newUser = await pool.query("INSERT INTO users (username) VALUES ($1) RETURNING *", [username]);
    res.json(newUser.rows)
}

const updateUser = async(req, res) => {
    const { oldUsername } = req.body;
    const { username } = req.body;
    const { password } = req.body;

    const updatedUser = await pool.query("UPDATE users SET username=$1, password=$2 WHERE username=$3 RETURNING *", [username, password, oldUsername]);

    res.json(updatedUser.rows)
}

const deleteUser = async(req, res) => {
    const { username } = req.body;
    const deletedUser = await pool.query("DELETE FROM users WHERE username = $1 RETURNING *", [username]);

    res.json(deletedUser.rows);
}

module.exports = {
    getAllUsers,
    getUser,
    createNewUser,
    updateUser,
    deleteUser
}