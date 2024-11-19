const cors = require('cors');
require("dotenv").config();

const isDevelopment = process.env.NODE_ENV === 'development';

const corsOptions = {
  origin: (origin, callback) => {
    if (isDevelopment && origin === 'http://localhost:3000') {
      return callback(null, true);
    }

    const allowedOrigins = [
      'https://client-2zw8.onrender.com', // Your deployed frontend URL
    ];

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

module.exports = cors(corsOptions);