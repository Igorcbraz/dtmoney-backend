async function connect() {
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://uk7kyboxan0r8w44:UahjFSh7uxwkRBN7TzkA@ba6hyvusg7ltnbi1t5nc-mysql.services.clever-cloud.com:3306/ba6hyvusg7ltnbi1t5nc");
    console.log('Conectou no MySQL!');
    global.connection = connection
    return connection;
}

async function selectTransactions(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM tbl_transactions');
    return rows;
}

async function insertTransaction(transaction){
    const conn = await connect();
    const sql = "INSERT INTO tbl_transactions(title,tipo,category,amount,payer,createdAt) VALUES (?,?,?,?,?,?)";
    const values = [transaction.title, transaction.tipo, transaction.category, transaction.amount, transaction.payer, transaction.createdAt];
    await conn.query(sql, values);
    
    const lastTransaction = await conn.query("SELECT * FROM tbl_transactions ORDER BY id DESC LIMIT 1;");

    return lastTransaction[0][0]
}

module.exports = {selectTransactions, insertTransaction}