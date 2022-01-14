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

async function register(user){
    const pool   = await db.connect();

    let sql    = "INSERT INTO tbl_user(customer, email, pass, createdAt, estatus) VALUES (?, ?, md5(?), ?, 'active')";
    let values = [user.customer, user.email, user.pass, user.createdAt] ;
    const [rows] = await pool.query(sql, values);
    
    if(rows.affectedRows === 1){
        sql = "SELECT id, customer, email, createdAt FROM tbl_user WHERE email = ? AND pass = md5(?);";
        values = [user.email, user.pass];
        const [rows] = await pool.query(sql, values);

        const jwt = sign(rows[0], secret)

        return {jwt};
    } else {
        return {status: 'error'}
    }
    
}

module.exports = {login, register}