const connTransaction = require('./transactions')
const connLogin = require('./login')

const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json())


// Transactions routes
app.get('/transactions/:id', async (req, res) => {
  const transactions = await connTransaction.selectTransactions(req.params.id)
   return res.json(transactions)
  // try {
  //   const transactions = await connTransaction.selectTransactions(id)
  //   return res.json(transactions)
  // } catch (err) {
  //   return res.json({status: 'error', err})
  // }
})

app.post('/transactions', async (req, res) => {
  try {
    const transaction = await connTransaction.insertTransaction(req.body)
    return res.json(transaction)
  } catch (err) {
    return res.json({status: 'error', err})
  }
})

// Login routes
app.post('/login', async (req, res) => {
  try {
    const login = await connLogin.login(req.body);
    return res.json(login);
  } catch (err) {
    return res.json({status: 'error', err})
  }
})

const port = process.env.PORT || 3333;
app.listen(port, () => {console.log(`sever is running on port ${port}`)})