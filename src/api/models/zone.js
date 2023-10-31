const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
	zoneNumber: {
		type: Number,
		required: true,
		unique: true,
	},
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
