require('dotenv').config();
const db = require('./db')
const sign = require('jwt-encode');

const secret = process.env.SECRET_JWT;

async function login(user){
    const pool   = await db.connect();

    const sql    = "SELECT id, customer, email, createdAt FROM tbl_user WHERE email = ? AND pass = md5(?);"
    const values = [user.email, user.pass] 
    const [rows] = await pool.query(sql, values)

    const jwt = sign(rows[0], secret)

    return {jwt};
}

module.exports = {login}