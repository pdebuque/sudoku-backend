"use strict";
// very rough script for rating the difficulty of a puzzle based on the number of empty squares
exports.__esModule = true;
var seedPuzzles_1 = require("./seedPuzzles");
// const puzzlesWithDifficulty = []
for (var _i = 0, seedPuzzles_2 = seedPuzzles_1.seedPuzzles; _i < seedPuzzles_2.length; _i++) {
    var puzzle = seedPuzzles_2[_i];
    var count = 0;
    for (var i = 0; i < 81; i++) {
        if (puzzle.unsolved[i] === '0') {
            count++;
        }
    }
    console.log(count);
    if (count < 50)
        puzzle.difficulty = 'EASY';
    else if (count < 55)
        puzzle.difficulty = 'MEDIUM';
    else
        puzzle.difficulty = 'HARD';
}
console.log(seedPuzzles_1.seedPuzzles);
//# sourceMappingURL=rateDifficulty.js.map