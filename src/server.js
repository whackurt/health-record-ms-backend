// Import required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./config/connectToDb');

// Create an instance of Express
const app = express();

// dependencies
const authRoutes = require('./api/routes/auth');

// connect to database
connectToDb();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

// start server
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
