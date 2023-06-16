// very rough script for rating the difficulty of a puzzle based on the number of empty squares

import { seedPuzzles } from './seedPuzzles';
import {Difficulty} from '@prisma/client';


// const puzzlesWithDifficulty = []


for (let puzzle of seedPuzzles) {
  let count = 0;
  for (let i = 0; i < 81; i++) {
    if (puzzle.unsolved[i] === '0') {
      count++;
    }
  }
  console.log(count)
  if (count < 50) puzzle.difficulty = Difficulty.EASY;
  else if (count < 55) puzzle.difficulty = Difficulty.MEDIUM;
  else puzzle.difficulty = Difficulty.HARD;
}

console.log(seedPuzzles)