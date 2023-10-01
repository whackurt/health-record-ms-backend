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
		address: {
			type: String,
		},
		zone: {
			type: mongoose.Types.ObjectId,
			ref: 'Zone',
		},
		birthDate: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
