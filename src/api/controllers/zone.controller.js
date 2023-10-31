const Zone = require('../models/zone');

const createZone = async (req, res) => {
	const { zoneNumber, zoneName } = req.body;

	try {
		const newZone = await Zone.create({ zoneNumber, zoneName });

		res.status(201).json({
			message: 'Zone created successfully.',
			data: newZone,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const getZones = async (req, res) => {
	try {
		const zones = await Zone.find();

		res.status(200).json({
			data: zones,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const updateZone = async (req, res) => {
	const filter = { _id: req.params.zoneId };
	const { updates } = req.body;
	try {
		const updatedZone = await Zone.findOneAndUpdate(filter, updates, {
			returnOriginal: false,
		});

		res.status(200).json({
			data: updatedZone,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const deleteZone = async (req, res) => {
	const zoneId = req.params.zoneId;
	try {
		const deletedZone = await Zone.deleteOne({ _id: zoneId });

		res.status(200).json({
			message: 'Zone was deleted successfully.',
			data: deletedZone,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

module.exports = {
	createZone,
	getZones,
	updateZone,
	deleteZone,
};
