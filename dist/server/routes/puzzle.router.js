"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.puzzleRouter = void 0;
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
exports.puzzleRouter = express_1["default"].Router();
//** ----------- GET puzzles ----------- **/
exports.puzzleRouter.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var puzzles, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 5]);
                return [4 /*yield*/, prisma.puzzle.findMany()];
            case 1:
                puzzles = _a.sent();
                res.send(puzzles);
                return [3 /*break*/, 5];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
//** ----------- GET random puzzle ----------- **/
exports.puzzleRouter.get('/random', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var puzzlesCount, skip, puzzles, randomPuzzle, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 6]);
                return [4 /*yield*/, prisma.puzzle.count()];
            case 1:
                puzzlesCount = _a.sent();
                skip = Math.floor(Math.random() * puzzlesCount);
                return [4 /*yield*/, prisma.puzzle.findMany({
                        take: 1,
                        skip: skip
                    })];
            case 2:
                puzzles = _a.sent();
                randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
                res.send(randomPuzzle);
                return [3 /*break*/, 6];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res.sendStatus(500);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
//** ----------- GET random easy puzzle ----------- **/
exports.puzzleRouter.get('/random/easy', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var puzzles, randomPuzzle, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 5]);
                return [4 /*yield*/, prisma.puzzle.findMany({
                        where: { difficulty: 'EASY' }
                    })];
            case 1:
                puzzles = _a.sent();
                randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
                res.send(randomPuzzle);
                return [3 /*break*/, 5];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
//** ----------- GET random medium puzzle ----------- **/
exports.puzzleRouter.get('/random/medium', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var puzzles, randomPuzzle, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 5]);
                return [4 /*yield*/, prisma.puzzle.findMany({
                        where: { difficulty: 'MEDIUM' }
                    })];
            case 1:
                puzzles = _a.sent();
                randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
                res.send(randomPuzzle);
                return [3 /*break*/, 5];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
//** ----------- GET random hard puzzle ----------- **/
exports.puzzleRouter.get('/random/hard', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var puzzles, randomPuzzle, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 5]);
                return [4 /*yield*/, prisma.puzzle.findMany({
                        where: { difficulty: 'HARD' }
                    })];
            case 1:
                puzzles = _a.sent();
                randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
                res.send(randomPuzzle);
                return [3 /*break*/, 5];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=puzzle.router.js.map