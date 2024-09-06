import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  HttpException,
  Body,
  Get,
  Param,
  Put,
  Delete
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() transactionDto: TransactionDto,
  ) {
    try {
      const { userId, ...data } = transactionDto;

      const transaction = await this.transactionService.create({
        ...data,
        user: {
          connect: {
            id: transactionDto.userId
          }
        }
      });

      return transaction;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error creating transaction'
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Body() transactionDto: TransactionDto,
  ) {
    try {
      const transactions = await this.transactionService.getAll(transactionDto);

      return transactions;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error getting transactions'
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(
    @Param('id') id: string
  ) {
    try {
      const transaction = await this.transactionService.getOne({
        id: Number(id)
      });

      return transaction;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error getting transaction'
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() transactionDto: TransactionDto,
  ) {
    try {
      const existsTransaction = await this.transactionService.getOne({
        id: Number(id)
      });

      if (!existsTransaction) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Transaction not found'
        }, HttpStatus.NOT_FOUND);
      }

      const transaction = await this.transactionService.update({
        where: {
          id: Number(id)
        },
        data: transactionDto
      });

      return transaction;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error updating transaction'
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id') id: string
  ) {
    try {
      const existsTransaction = await this.transactionService.getOne({
        id: Number(id)
      });

      if (!existsTransaction) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Transaction not found'
        }, HttpStatus.NOT_FOUND);
      }

      const transaction = await this.transactionService.delete({
        id: Number(id)
      });

      return transaction;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error deleting transaction'
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }
}
