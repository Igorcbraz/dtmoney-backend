import { Request, Response } from "express";

import { selectAllTransactions, insertTransaction, deleteTransaction, updateTransaction } from "../model/transaction";

export class TransactionController {
    async select(req: Request, res: Response){
        try {
            const transactions = await selectAllTransactions(Number(req.params.id))

            return res.json(transactions);
        } catch (err) {
            return res.json({status: 'error', err})
        }
    }

    async insert(req: Request, res: Response){
        // try {
            const transactions = await insertTransaction(req.body);

            return res.json(transactions);
        // } catch (err) {
        //     return res.json({status: 'error', err})
        // }
    }

    async delete(req: Request, res: Response){
        try {
            const transactions = await deleteTransaction(Number(req.params.id), Number(req.params.userId));

            return res.json(transactions);
        } catch (err) {
            return res.json({status: 'error', err})
        }
    }

    async update(req: Request, res: Response){
        try {
            const transactions = await updateTransaction(req.body);

            return res.json(transactions);
        } catch (err) {
            return res.json({status: 'error', err})
        }
    }
}