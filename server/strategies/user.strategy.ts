import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { comparePassword } from '../modules/encryption';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// serializeUser simplifies tracking the user by using only its id

// both serialize and deserialize user are needed for passport to work - they are invoked internally
passport.serializeUser((user: any, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  try {
    const user = prisma.user.findUnique({
      where: { id: String(id) }
    });
    if (!user) {
      throw new Error('User not found');
      done(null, null);
    }

    else {
      // Remove the password from the user object before sending it up to the client
      const foundUser = user as unknown as Omit<User, "password">;
      done(null, foundUser);
    }
  }
  catch (error) {
    console.error('error in deserializeUser:', error);
    done(error);
  }
});

// Does actual work of logging in
// find row that matches username and compare passwords
passport.use(
  'local',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username: String(username) }
      })

      // no username matches => return false
      // done is a passport callback that has parameters (error, user, info)
      if (!user) return done(null, false, { message: 'no users match that username.' });

      // check user's password against the provided password
      if (comparePassword(password, user.password)) {
        // Remove the password from the user object before sending it up to the client
        const foundUser = user as unknown as Omit<User, "password">;
        return done(null, foundUser);
      }

      // if no password match is found, return null in the done callback, resulting in a 401 status code
      else {
        return done(null, false, { message: 'passwords do not match.' });
      }
    }
    catch (error) {
      // if server fails to connect to db, return error
      console.error('error finding user:', error);
      return done(error);
    }
    finally {
      await prisma.$disconnect()
    }
  })
);


module.exports = passport