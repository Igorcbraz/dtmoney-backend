import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function selectAllTransactions (id: number) {
  const allTransactions = await prisma.tbl_transactions.findMany({
    where: {
      FK_id_user: id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return allTransactions
}

interface TransactionProps {
  title: string
  tipo: string
  category: string
  amount: number
  payer: string
  createdAt: string
  id: number
  fkIdUser: number
}
export async function insertTransaction ({
  title,
  tipo,
  category,
  amount,
  payer,
  createdAt,
  fkIdUser
}: TransactionProps) {
  await prisma.tbl_transactions.create({
    data: {
      title,
      tipo,
      category,
      amount,
      payer,
      createdAt,
      FK_id_user: fkIdUser
    }
  })

  const lastTransaction = await prisma.tbl_transactions.findFirst({
    orderBy: {
      id: 'desc'
    }
  })

  return lastTransaction
}

export async function deleteTransaction (id: number, userId: number) {
  await prisma.tbl_transactions.delete({
    where: {
      id
    }
  })

  const newTransactions = await selectAllTransactions(userId)

  return newTransactions
}

export async function updateTransaction ({
  title,
  amount,
  tipo,
  category,
  payer,
  createdAt,
  id,
  fkIdUser
}: TransactionProps) {
  await prisma.tbl_transactions.update({
    where: {
      id
    },
    data: {
      title,
      amount,
      tipo,
      category,
      payer,
      createdAt
    }
  })

  const newTransactions = await selectAllTransactions(fkIdUser)

  return newTransactions
}
