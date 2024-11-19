const passport = require("passport");
const JwtStrategy = require("./passportJWTConfig");
const googleOAuth = require("./passportGoogleOauthConfig");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

passport.use(JwtStrategy);
passport.use(googleOAuth);

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.User.findUnique({ where: { id } });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
