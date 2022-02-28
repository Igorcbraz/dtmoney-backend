import { Request, Response } from "express";

import { login, register } from "../model/customer.js";

export class UserController{
    async login(req: Request, res: Response){
        try {
            const loginData = await login(req.body);

            return res.json(loginData);
        } catch (err) {
            return res.json({status: 'error', err})
        }
    }

    async register(req: Request, res: Response){
        try {
            const registerData = await register(req.body);

            return res.json(registerData);
        } catch (err) {
            return res.json({status: 'error', err})
        }
    }
}