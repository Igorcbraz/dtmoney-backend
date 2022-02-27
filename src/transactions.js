const db = require('./db')

// Transactions Connections 
async function selectTransactions(id){
    const pool = await db.connect();
    const [rows] = await pool.query('SELECT * FROM tbl_transactions WHERE FK_id_user = ? ORDER BY createdAt DESC', [id]);
    return rows;
}

async function insertTransaction(transaction){
    const pool = await db.connect();
    const sql = "INSERT INTO tbl_transactions(title,tipo,category,amount,payer,createdAt, FK_id_user) VALUES (?,?,?,?,?,?, ?)";
    const values = [transaction.title, transaction.tipo, transaction.category, transaction.amount, transaction.payer, transaction.createdAt, transaction.id];
    await pool.query(sql, values);
    
    const lastTransaction = await pool.query("SELECT * FROM tbl_transactions ORDER BY id DESC LIMIT 1;");

    return lastTransaction[0][0]
}

async function deleteTransaction(id, userId){
    const pool = await db.connect();
    await pool.query('DELETE FROM tbl_transactions WHERE id = ?', [id]);
    const transactions = await pool.query('SELECT * FROM tbl_transactions WHERE FK_id_user = ? ORDER BY createdAt DESC', [userId]);
    
    return transactions[0];
}

async function updateTransaction(transaction){
    const pool = await db.connect();
    const sql  = "UPDATE tbl_transactions SET title = ?, amount = ?, tipo = ?, category = ?, payer = ?,	createdAt = ? WHERE id = ?" ;
    const values = [transaction.title, transaction.amount, transaction.tipo, transaction.category, transaction.payer, transaction.createdAt, transaction.id];
    const [rows] = await pool.query(sql, values);

    const transactions = await pool.query('SELECT * FROM tbl_transactions WHERE FK_id_user = ? ORDER BY createdAt DESC', [transaction.FK_id_user]);
    
    return transactions[0];
}

module.exports = {selectTransactions, insertTransaction, deleteTransaction, updateTransaction}