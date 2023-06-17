import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export const puzzleAttemptRouter = express.Router();

//** ----------- GET puzzleAttempts ----------- **/



//** ----------- GET puzzleAttempts by user id ----------- **/







//** ----------- POST puzzleAttempt ----------- **/

puzzleAttemptRouter.post('/:userId/:puzzleId', async (req, res) => {


})


