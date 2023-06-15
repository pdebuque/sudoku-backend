import { PrismaClient } from '@prisma/client'
import { add } from 'date-fns'

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

  const puzzle = await prisma.puzzle.create({
    data: {
      difficulty: 'HARD',
      unsolved: '070000043040009610800634900094052000358460020000800530080070091902100005007040802',
      solved: '679518243543729618821634957794352186358461729216897534485276391962183475137945862',
      puzzleAttempts: {
        create: {
          user: { connect: { id: user.id } },
          startTime: new Date(),
          endTime: add(new Date(), { minutes: 20 }),
          isSolved: false,
        }
      }
    },
    include: { puzzleAttempts: true }
  });
  console.log(puzzle)

}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })