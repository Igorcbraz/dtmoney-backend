import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

export async function selectAllTransactions(id: number){
    const allTransactions = await prisma.tbl_transactions.findMany({
        where: {
            FK_id_user: id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    if(allTransactions){
        return allTransactions
    } else {
        return {
            status: 'error'
        }
    }
}

interface InsertTransactionProps{
    title: string;
    tipo: string;
    category: string;
    amount: number;
    payer: string;
    createdAt: string;
    FK_id_user: number;
}
export async function insertTransaction({
    title,
    tipo,
    category,
    amount,
    payer,
    createdAt,
    FK_id_user
}: InsertTransactionProps){
    const insertTransaction = await prisma.tbl_transactions.create({
        data: {
            title,
            tipo,
            category,
            amount,
            payer,
            createdAt,
            FK_id_user
        }
    });

    if(insertTransaction){
        const lastTransaction = await prisma.tbl_transactions.findFirst({
            orderBy: {
                id: 'desc'
            }
        });

        if(lastTransaction){
            return lastTransaction;
        } else {
            return {
                status: 'error'
            }
        }
    } else {
        return {
            status: 'error'
        }
    }
}

export async function deleteTransaction(id: number, userId: number){
    const deleteTransaction = await prisma.tbl_transactions.delete({
        where: {
            id: id
        }
    });

    if(deleteTransaction){
        const newTransactions = await selectAllTransactions(userId);

        return newTransactions;
    } else {
        return {
            status: 'error'
        }
    }
}

interface UpdateTransactionProps extends InsertTransactionProps{
    id: number;
}
export async function updateTransaction({
    title,
    amount,
    tipo,
    category,
    payer,
    createdAt,
    id,
    FK_id_user
}: UpdateTransactionProps){
    const updateTransaction = await prisma.tbl_transactions.update({
        where: {
            id
        }, 
        data: {
            title,
            amount,
            tipo,
            category,
            payer,
            createdAt,
        }
    });

    if(updateTransaction){
        const newTransactions = await selectAllTransactions(FK_id_user);

        return newTransactions;
    } else {
        return {
            status: 'error'
        }
    }
}