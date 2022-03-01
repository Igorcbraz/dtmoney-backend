import { Router } from "express";
import { UserController } from "./controller/User";
import { TransactionController } from "./controller/Transactions";

const router = Router();

const user = new UserController();
const transactions = new TransactionController();

// Transactions routes
router.get('/transactions/:id'           , transactions.select)
router.post('/transactions'              , transactions.insert)
router.delete('/transactions/:id/:userId', transactions.delete)
router.put('/transactions'               , transactions.update)

// User routes
router.post('/login'   , user.login)
router.post('/register', user.register)

export { router };