//Imports
require("dotenv").config();

const express = require("express");

//Middleware imports
// const corsConfig = require('./configs/cors');

//Application
const app = express();
const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});

//Middleware
const passport = require("passport");
require("./configs/passport");
app.use(passport.initialize());
// app.use(corsConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
const googAuth = require('./routers/googleAuthRouter');
app.use('/auth/google',googAuth);

const jwtAuth = require('./routers/jwtRouter');
app.use('/auth/jwt',jwtAuth);

//Routers
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

