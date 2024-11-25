require("dotenv").config();

const { createServer } = require("http");
const express = require("express");

// Middleware imports
const corsConfig = require("./configs/corsConfig");

// Application
const app = express();
const port = process.env.SERVER_PORT;

const httpServer = createServer(app);



// Middleware
const passport = require("passport");
require("./configs/passport");
app.use(passport.initialize());
app.use(corsConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const googAuth = require("./routers/googleAuthRouter");
app.use("/auth/google", googAuth);

const jwtAuth = require("./routers/jwtRouter");
app.use("/auth/jwt", jwtAuth);

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Import and set up Socket.IO
const setupSocket = require("./middlewares/socket");
setupSocket(httpServer);

// Start server
httpServer.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
