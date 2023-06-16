import express, {Request, Response, NextFunction} from 'express';
import {userRouter} from './routes/user.router';
import {puzzleRouter} from './routes/puzzle.router';

const app = express();




/** ----------------- EXPRESS ROUTES ----------------- **/
app.use('/api/user', userRouter);
app.use('/api/puzzle', puzzleRouter);





/** ----------------- START SERVER ----------------- **/
const PORT = process.env.PORT || 5000; // Use 5000 if no env var

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});