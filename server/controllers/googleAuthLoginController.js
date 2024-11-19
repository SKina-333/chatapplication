require("dotenv").config();
const utils = require("../libs/utils");


const googleLoginCallback = async (req, res) => {
  const user = req.user;
  if (!user) {
    res
      .status(401)
      .json({ success: false, msg: "Something is wrong with user" });
  }

  const tokenObject = utils.issueJWT(user);
  res.status(200).json({
    success: true,
    token: tokenObject.token,
    expiresIn: tokenObject.expires,
  });
};

const verifyUser = (req, res) => {
  res.status(200).json({
    success: true,
    msg: "You are successfully authenticated to this route!",
  });
};

module.exports = {
  
  googleLoginCallback,
  verifyUser,
};
