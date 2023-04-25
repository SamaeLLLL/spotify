const pool = require('../db')
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const upload = require('express-fileupload');
const { error } = require('console');

const uploadPP = async (req, res) => {
    if (!req.files) return res.sendStatus(400);
    const pic = req.files.file;
    const fileName = pic.name;
    const fileExtension = fileName.split(".").pop();
    const allowedExtensions = ["png", "jpg", "jpeg"];
    if (!allowedExtensions.includes(fileExtension.toLowerCase())) return res.status(400).json({"error":"not a supported file type"});

    const { jwt } = req.cookies;
    
    const userIdQ = await pool.query("SELECT id FROM users WHERE refresh_token=$1",[jwt]);
    if (!userIdQ) return res.sendStatus(403);
    const userId = userIdQ.rows[0]?.id;
    if (!userId) return res.sendStatus(403);
    // Get the old profilePic
    const oldPic = await pool.query("SELECT user_img FROM users WHERE id=$1",[userId]);
    const oldPicName = oldPic.rows[0]?.user_img;
    
    // Set the new profilePic
    const ppName = userId + ".png";
    await pool.query("UPDATE users SET user_img=$1 WHERE id=$2", [ppName, userId]);
    
    // Resize the image
    sharp(pic.data)
    .resize(500, 500)
    .toBuffer()
    .then((outputBuffer) => {
        fs.writeFileSync('uploads/profilePictures/' + ppName, outputBuffer, err => {err ? console.error("resize error") : null})
        })
        .catch(err => {console.error("sharp: " + err)
    }).then(res.json({"Message": "File uploaded"}));
}


const getPP = async (req, res) => {
    const { jwt } = req.cookies;

    const userIdQ = await pool.query("SELECT id FROM users WHERE refresh_token=$1",[jwt]);
    if (!userIdQ.rows[0]?.id) return res.sendStatus(403);
    const userId = userIdQ.rows[0].id;
    // Get the profilePic name
    const pic = await pool.query("SELECT user_img FROM users WHERE id=$1",[userId]);
    const picName = pic.rows[0]?.user_img;
    if (!picName) return res.sendStatus(400);

    const pathName = path.join(__dirname, '../uploads/profilePictures')
    const options = {
        root: pathName, // specify the directory where the file is located
        headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
        }
    };

    res.sendFile(picName, options, (err) => {err ? console.error(err) : ""})

}

module.exports = {uploadPP, getPP}