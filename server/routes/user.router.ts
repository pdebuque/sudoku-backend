import express from 'express';
import { PrismaClient } from '@prisma/client'
import { encryptPassword } from '../modules/encryption';
import { rejectUnauthenticated } from '../modules/authentication-middleware';

const userStrategy = require('../strategies/user.strategy');

export const userRouter = express.Router();

const prisma = new PrismaClient();

//** ----------- check for user info if authenticated ----------- **/

userRouter.get('/', rejectUnauthenticated, async (req, res) => {
  // if logged in, send back user object from server session
  res.send(req.user);
});

//** ----------- register: POST ----------- **/

userRouter.post('/register', async (req, res) => {
  try {
    // get username and password from req.body
    const { username } = req.body;
    const password = encryptPassword(req.body.password);
    const email = req.body.email;

    // add user to database

    await prisma.user.create({
      data: {
        username: String(username),
        password: String(password),
        email: String(email)
      }
    })
    // send back success
    res.sendStatus(201);
  }
  // if error, send back error

  //todo: various error handling
  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect();
  }
})
5

//** ----------- login: POST ----------- **/

userRouter.post('/login', userStrategy.authenticate('local'), (req, res) => {
  // middleware handles logging in; if this function executes, log in was successful

  // if login was unsuccessful, this function will never run; passport will send the appropriate error message itself
  res.sendStatus(200);
});

//** ----------- logout: POST ----------- **/

userRouter.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logOut(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
  res.sendStatus(200);
});

//** ----------- GET users ----------- **/

userRouter.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  }
  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  finally {
    await prisma.$disconnect();
  }
})