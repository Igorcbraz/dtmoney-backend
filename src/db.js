async function connect() {
    const mysql = require("mysql2/promise");
    const pool = mysql.createPool({
        host: 'ba6hyvusg7ltnbi1t5nc-mysql.services.clever-cloud.com',
        user: 'uk7kyboxan0r8w44',
        password: 'UahjFSh7uxwkRBN7TzkA',
        database: 'ba6hyvusg7ltnbi1t5nc',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    console.log('Conectou MySQL!')
    return pool;
}

async function selectTransactions(){
    const pool = await connect();
    const [rows] = await pool.query('SELECT * FROM tbl_transactions');
    return rows;
}

async function insertTransaction(transaction){
    const pool = await connect();
    const sql = "INSERT INTO tbl_transactions(title,tipo,category,amount,payer,createdAt) VALUES (?,?,?,?,?,?)";
    const values = [transaction.title, transaction.tipo, transaction.category, transaction.amount, transaction.payer, transaction.createdAt];
    await pool.query(sql, values);
    
    const lastTransaction = await pool.query("SELECT * FROM tbl_transactions ORDER BY id DESC LIMIT 1;");

    return lastTransaction[0][0]
}

module.exports = {selectTransactions, insertTransaction}