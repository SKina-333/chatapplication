require("dotenv").config();
const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");
let PRIV_KEY =''

if (process.env.NODE_ENV === "developement") {
  const pathToKey = path.join(__dirname, "../etc/secrets", "id_rsa_priv.pem");
  PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
} else {
  PRIV_KEY = process.env.PRIV_KEY;
}

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

function issueJWT(user) {
  const _id = user.id;

  const expiresIn = "1"; //1 day

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
