const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Load the verifying public key
const pathToKey = path.join(__dirname, "../etc/secrets/", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// JWT Strategy options
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

// Export the configured JWT strategy
module.exports = new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    // Search for the user in the database using the payload ID
    const user = await prisma.Users.findUnique({
      where: {
        id: jwt_payload.sub,
      },
    });

    // If user is found, return it; otherwise, return false
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});
