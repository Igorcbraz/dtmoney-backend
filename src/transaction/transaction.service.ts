import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';
import { PrismaService } from '../module/prisma/prisma.service';


@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TransactionCreateInput): Promise<Transaction>  {
    const createTransaction = await this.prisma.transaction.create({ data });
    return createTransaction;
  }

  async update(params: {
    where: Prisma.TransactionWhereUniqueInput;
    data: Prisma.TransactionUpdateInput;
  }): Promise<Transaction> {
    const updateTransaction = await this.prisma.transaction.update({
      where: params.where,
      data: params.data,
    });
    return updateTransaction;
  }

  async getOne(transactionWhereUniqueInput: Prisma.TransactionWhereUniqueInput ): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: transactionWhereUniqueInput,
    });
    return transaction;
  }

  async getAll(where?: Prisma.TransactionWhereInput): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({ where });
    return transactions;
  }

  async delete(where: Prisma.TransactionWhereUniqueInput): Promise<Transaction> {
    const deleteTransaction = await this.prisma.transaction.delete({
      where,
    });
    return deleteTransaction;
  }
}
