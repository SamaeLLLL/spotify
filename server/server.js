const express = require('express');
const app = express();
const pool = require("./db");
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');


// middleware
app.use(express.json());
app.use(upload());

// middleware for cookies
app.use(cookieParser())

// routes
app.use('/users/register', require('./routes/register'));
app.use('/users/auth', require('./routes/auth'));
app.use('/users/refresh', require('./routes/refresh'));
app.use('/users/logout', require('./routes/logout'));
app.use('/profile', require('./routes/api/profile'));

app.use(verifyJWT);
app.use('/users', require('./routes/api/users'));
app.use('/api/savedalbums', require('./routes/api/playlists'));
app.use('/api/search', require('./routes/api/search'));
app.use('/api/likedsongs', require('./routes/api/likedSongs'));
app.use('/api/albums', require('./routes/api/albums'));




app.listen(5000, () => {console.log("Server started on port 5000")})