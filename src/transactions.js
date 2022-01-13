const db = require('./db')

// Transactions Connections 
async function selectTransactions(id){
    const pool = await db.connect();
    const [rows] = await pool.query('SELECT * FROM tbl_transactions WHERE FK_id_user = ?', [id]);
    return rows;
}

async function insertTransaction(transaction){
    const pool = await db.connect();
    const sql = "INSERT INTO tbl_transactions(title,tipo,category,amount,payer,createdAt) VALUES (?,?,?,?,?,?)";
    const values = [transaction.title, transaction.tipo, transaction.category, transaction.amount, transaction.payer, transaction.createdAt];
    await pool.query(sql, values);
    
    const lastTransaction = await pool.query("SELECT * FROM tbl_transactions ORDER BY id DESC LIMIT 1;");

    return lastTransaction[0][0]
}

module.exports = {selectTransactions, insertTransaction}