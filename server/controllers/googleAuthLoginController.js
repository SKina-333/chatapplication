require("dotenv").config();
const utils = require("../libs/utils");

const googleLoginCallback = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      if (!user) {
        return res.redirect(
          `http://localhost:5173/login?error=${encodeURIComponent(
            "User authentication failed"
          )}`
        );
      }
    }

    const { token, expires } = utils.issueJWT(user);

    res.redirect(
      `http://localhost:5173/login?token=${encodeURIComponent(
        token
      )}&expires=${encodeURIComponent(expires)}`
    );
  } catch (error) {
    console.error("Error in Google login callback:", error);

    // Redirect to frontend with a generic error message
    return res.redirect(
      `http://localhost:5173/login?error=${encodeURIComponent(
        "An unexpected error occurred"
      )}`
    );
  }
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
