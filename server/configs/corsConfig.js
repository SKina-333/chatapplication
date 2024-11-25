const cors = require('cors');

const corsOptions = {
    origin: [
        'http://localhost:5173', // For local development
 // Your frontend Render URL
      ],
    credentials: true,
};

module.exports = cors(corsOptions);