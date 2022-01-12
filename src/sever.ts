const db = require('./db')
import "reflect-metadata";

import express from 'express';
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


app.listen(3333, () => {console.log('sever is running on port 3333')})