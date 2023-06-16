/*
  Warnings:

  - A unique constraint covering the columns `[unsolved]` on the table `Puzzle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[solved]` on the table `Puzzle` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PuzzleAttempt" ADD COLUMN     "secondsToSolve" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Puzzle_unsolved_key" ON "Puzzle"("unsolved");

-- CreateIndex
CREATE UNIQUE INDEX "Puzzle_solved_key" ON "Puzzle"("solved");
