const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:5173", // For local development
    "https://chat-application-client-w7e2.onrender.com", // Your frontend Render URL
  ],
  credentials: true,
};

module.exports = cors(corsOptions);
