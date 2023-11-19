const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		birthDate: {
			type: Date,
			required: true,
		},
		zone: {
			type: mongoose.Types.ObjectId,
			ref: 'Zone',
		},
		street: {
			type: String,
			required: true,
		},
		barangay: {
			type: String,
			required: true,
		},
		city_municipality: {
			type: String,
			required: true,
		},
		province: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
