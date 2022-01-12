const db = require('./db')

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});

app.use(bodyParser.json())


app.get('/transactions', async (req, res) => {

  const transactions = await db.selectTransactions()
  return res.json(transactions)
})

app.post('/transactions', async (req, res) => {

  const transaction = await db.insertTransaction(req.body)
  return res.json(transaction)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`sever is running on port ${port}`)})