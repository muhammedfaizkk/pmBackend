const express = require("express");
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');

// Apply CORS middleware to handle Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming request bodies as JSON
app.use(express.json());

// Parse incoming request bodies as URL encoded data
app.use(express.urlencoded({ extended: true }));

// Mount the userRoute middleware
app.use(userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send(err.message); // Send internal server error with error message
});

module.exports = app;
