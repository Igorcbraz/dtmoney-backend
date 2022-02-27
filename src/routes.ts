import { Router } from "express";
import { UserController } from "./controller/User";

const router = Router();

//User
const user = new UserController();

// Transactions routes
router.get('/transactions/:id',)
router.post('/transactions',)
router.delete('/transactions/:id/:userId')
router.put('/transactions',)

// User routes
router.post('/login', user.login)
router.post('/register', user.register)

export { router };