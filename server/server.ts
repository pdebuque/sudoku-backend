import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './routes/user.router';
import { puzzleRouter } from './routes/puzzle.router';
import { puzzleAttemptRouter } from './routes/puzzleAttempt.router';

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const bodyparser = require('body-parser');

const cors = require('cors');

const app = express();


/** ---------- MIDDLEWARE ---------- **/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(sessionMiddleware)

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


/** ----------------- EXPRESS ROUTES ----------------- **/
app.use('/api/user', userRouter);
app.use('/api/puzzle', puzzleRouter);
app.use('/api/puzzleAttempt', puzzleAttemptRouter)




/** ----------------- START SERVER ----------------- **/
const PORT = process.env.PORT || 5000; // Use 5000 if no env var

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});