"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_router_1 = require("./routes/user.router");
var puzzle_router_1 = require("./routes/puzzle.router");
var app = (0, express_1["default"])();
/** ----------------- EXPRESS ROUTES ----------------- **/
app.use('/api/user', user_router_1.userRouter);
app.use('/api/puzzle', puzzle_router_1.puzzleRouter);
/** ----------------- START SERVER ----------------- **/
var PORT = process.env.PORT || 5000; // Use 5000 if no env var
app.listen(PORT, function () {
    console.log("Listening on port: ".concat(PORT));
});
//# sourceMappingURL=server.js.map