import { Difficulty } from '@prisma/client';

declare module 'seedPuzzles' {
  export interface Puzzle {
    difficulty: Difficulty;
    solved: string;
    unsolved: string;
  }
}