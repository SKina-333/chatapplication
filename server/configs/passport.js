const passport = require("passport");
const JwtStrategy = require("./passportJWTConfig");
const googleOAuth = require("./passportGoogleOauthConfig");

passport.use(JwtStrategy);
passport.use(googleOAuth);


