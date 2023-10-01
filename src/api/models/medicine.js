const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		qty: {
			type: Number,
		},
		patientId: {
			type: mongoose.Types.ObjectId,
			ref: 'Patient',
		},
		dateGiven: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
