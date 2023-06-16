import express from 'express';
import { PrismaClient } from '@prisma/client'

export const userRouter = express.Router();

const prisma = new PrismaClient();

//** ----------- GET users ----------- **/

userRouter.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  }
  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect();
  }
})