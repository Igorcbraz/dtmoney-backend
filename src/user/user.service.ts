import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../module/prisma/prisma.service';

import jwt from 'jsonwebtoken'
import md5 from 'md5'

interface JwtPayload {
  id: number;
  email: string;
  customer: string;
  createdAt: Date;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User>  {
    const createUser = await this.prisma.user.create({ data });
    return createUser;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const updateUser = await this.prisma.user.update({
      where: params.where,
      data: params.data,
    });
    return updateUser;
  }

  async getOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    return user;
  }

  async getAll(where?: Prisma.UserWhereInput): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where });
    return  users;
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const deleteUser = await this.prisma.user.delete({
      where,
    });
    return deleteUser;
  }

  hashPassword(password: string): string {
    return md5(password);
  }

  generateToken(payload: JwtPayload): string {
    const secret = process.env.SECRET_JWT ?? '';
    return jwt.sign(payload, secret, { expiresIn: 3600 }); // 1 hr
  }
}