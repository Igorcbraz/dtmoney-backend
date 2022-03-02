import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import md5 from 'md5'

import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();


interface LoginProps{
    email: string;
    pass: string;
}
export async function login({ email, pass }: LoginProps){
    const user = await prisma.tbl_user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            customer: true,
            email: true,
            createdAt: true, 
            pass: true
        }
    });

    if(user && md5(pass) === user.pass){
        const { id, customer, email, createdAt } =  user;

        const secret = process.env.SECRET_JWT ?? '';
        const token = jwt.sign({
            id,
            customer,
            email,
            createdAt
        }, secret, {
            expiresIn: 300 // expires in 5min
        });
        
        return {
            jwt: token
        }
    } else {
        return {
            status: 'error'
        }
    }
}


interface RegisterProps{
    customer: string;
    email: string;
    pass: string;
    createdAt: string;
}
export async function register({
    customer,
    email,
    pass,
    createdAt,
}: RegisterProps){
    const userExists = await prisma.tbl_user.findUnique({
        where: {
            email: email
        }
    });

    if(!userExists){
        const insertUser = await prisma.tbl_user.create({
            data: { 
                customer,
                email,
                pass: md5(pass),
                createdAt,
                estatus: 'active'
            }
        });

        if(insertUser){
            const userId = await prisma.tbl_user.findUnique({
                where: {
                    email
                },
                select: {
                    id: true,
                }
            });

            if(!userId) {
                return {
                    status: 'error',
                    msg: 'User id is not defined'
                }
            }

            const secret = process.env.SECRET_JWT ?? '';
            const token = jwt.sign({
                id: userId.id,
                customer,
                email,
                createdAt
            }, secret, {
                expiresIn: 300 // expires in 5min
            });
            
            return {
                jwt: token
            }
        } else {
            return {
                status: 'error',
                msg: 'Error inserting user in database'
            }
        }
    } else {
        return {
            status: 'error',
            msg: 'Users do not exists'
        }
    } 
}