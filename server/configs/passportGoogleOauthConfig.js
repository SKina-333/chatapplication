const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      let user = await prisma.Users.findFirst({
        where: {
          googleId: profile.id,
        },
      });
      if (user) {
        return done(null, user);
      } else {
        user = await prisma.Users.upsert({
          where: {
            username: username,
          },
          update: {
            googleId: profile.id,
            email: profile.emails[0].value,
          },
          create: {
            googleId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName,
          },
        });
      }
    } catch (err) {
      return done(err, false);
    }
  }
);
