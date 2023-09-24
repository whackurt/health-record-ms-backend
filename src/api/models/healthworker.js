const mongoose = require('mongoose');

const healthWorkerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		healthWorkerId: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const HealthWorker = mongoose.model('HealthWorker', healthWorkerSchema);

module.exports = HealthWorker;
