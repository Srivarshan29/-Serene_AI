require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Check for API Key
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set in the .env file");
}

// Routes
app.use('/api', apiRoutes);

module.exports = app;
