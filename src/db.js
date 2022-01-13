require('dotenv').config();

async function connect() {
    const mysql = require("mysql2/promise");
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    console.log('Conectou MySQL!')
    return pool;
}

module.exports = {connect}