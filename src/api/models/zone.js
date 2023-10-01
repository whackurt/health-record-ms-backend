const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
	zoneNumber: {
		type: Number,
		required: true,
	},
	zoneName: {
		type: String,
	},
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
