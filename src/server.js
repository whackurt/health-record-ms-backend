// Import required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./config/connectToDb');

// Create an instance of Express
const app = express();

// dependencies
const authRoutes = require('./api/routes/auth.route');
const patientRoutes = require('./api/routes/patient.route');
const zoneRoutes = require('./api/routes/zone.route');
const medicineRoutes = require('./api/routes/medicine.route');

// connect to database
connectToDb();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/zone', zoneRoutes);
app.use('/api/medicine', medicineRoutes);

// start server
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
