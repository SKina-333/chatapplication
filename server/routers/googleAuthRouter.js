const express = require('express');
const passport = require("passport");

const {googleLoginCallback,verifyUser} = require('../controllers/googleAuthLoginController')


const router = express.Router();


router.get("/",passport.authenticate("google", { scope: ["email","profile"] }));
router.get("/callback",passport.authenticate("google", { session: false }),googleLoginCallback);
router.get("/protected",passport.authenticate('jwt', { session: false }),verifyUser);



module.exports = router