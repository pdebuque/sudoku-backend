import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export const puzzleRouter = express.Router();

//** ----------- GET puzzles ----------- **/

puzzleRouter.get('/', async (req, res) => {
  try {
    const puzzles = await prisma.puzzle.findMany();
    res.send(puzzles);
  }
  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect();
  }
})

//** ----------- GET random puzzle ----------- **/

puzzleRouter.get('/random', async (req, res) => {
  try {
    // skip a random amt from 0 - (number of puzzles-1), then take 1.
    const puzzlesCount= await prisma.puzzle.count();
    const skip = Math.floor(Math.random() * puzzlesCount);
    const puzzles = await prisma.puzzle.findMany({
      take: 1,
      skip: skip
    });
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    res.send(randomPuzzle);
  }
  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect();
  }
})

//** ----------- GET random easy puzzle ----------- **/

puzzleRouter.get('/random/easy', async (req, res) => {
  try {
    const puzzles = await prisma.puzzle.findMany({
      where: { difficulty: 'EASY' }
    });
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    res.send(randomPuzzle);
  }
  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect();
  }
})

//** ----------- GET random medium puzzle ----------- **/

puzzleRouter.get('/random/medium', async (req, res) => {
  try {
    const puzzles = await prisma.puzzle.findMany({
      where: { difficulty: 'MEDIUM' }
    });
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    res.send(randomPuzzle);
  }
  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect();
  }
})

//** ----------- GET random hard puzzle ----------- **/

puzzleRouter.get('/random/hard', async (req, res) => {
  try {
    const puzzles = await prisma.puzzle.findMany({
      where: { difficulty: 'HARD' }
    });
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    res.send(randomPuzzle);
  }
  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect();
  }
})