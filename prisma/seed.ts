import { PrismaClient } from '@prisma/client'
import { add, differenceInSeconds } from 'date-fns'

import { seedPuzzles } from '../seedPuzzles';

const prisma = new PrismaClient();

async function main() {
  await prisma.puzzleAttempt.deleteMany();
  await prisma.user.deleteMany(); // get around the unique constraints. not for production
  await prisma.puzzle.deleteMany(); // get around the unique constraints. not for production

  const user = await prisma.user.create({
    data: {
      name: 'Paolo',
      email: 'pdebuque@gmail.com',
    },
    include: { puzzleAttempts: true } // include the puzzle attempts in the response
  })
  console.log(user)

  const startTime = new Date();
  const endTime = add(new Date(), { minutes: 20 });

  for (let puzzle of seedPuzzles) {
    await prisma.puzzle.create({
      data: {
        difficulty: puzzle.difficulty,
        unsolved: puzzle.unsolved,
        solved: puzzle.solved,
      }
    })
  }

  // const puzzle = await prisma.puzzle.create({
  //   data: {
  //     difficulty: 'HARD',
  //     unsolved: '070000043040009610800634900094052000358460020000800530080070091902100005007040802',
  //     solved: '679518243543729618821634957794352186358461729216897534485276391962183475137945862',
  //     puzzleAttempts: {
  //       create: {
  //         user: { connect: { id: user.id } },
  //         startTime,
  //         endTime,
  //         secondsToSolve: differenceInSeconds(endTime, startTime),
  //         isSolved: false,
  //       }
  //     }
  //   },
  //   include: { puzzleAttempts: true }
  // });
  // console.log(puzzle)

  const results = await prisma.puzzleAttempt.aggregate({
    where: { userId: user.id },
    _avg: { secondsToSolve: true },
    _max: { secondsToSolve: true },
    _min: { secondsToSolve: true },
    _count: true, 
  });

  console.log(results)

}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })