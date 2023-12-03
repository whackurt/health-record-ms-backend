const HealthWorker = require('../models/healthworker');

const getHealthWorkers = async (req, res) => {
	try {
		const healthworkers = await HealthWorker.find();

		res.status(200).json({
			message: 'Healthworker accounts fetched successfully.',
			data: healthworkers,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const updateHealthworker = async (req, res) => {
	try {
		const { healthWorkerId } = req.params;
		const { updates } = req.body;

		const healthworker = await HealthWorker.findOne({
			healthWorkerId: healthWorkerId,
		});

		if (!healthworker) {
			return res.status(404).json({
				message: 'Healthworker account not found.',
			});
		}

		const updatedHealthworker = await HealthWorker.findOneAndUpdate(
			{ healthWorkerId: healthWorkerId },
			updates,
			{
				returnOriginal: false,
			}
		);

		return res.status(200).json({
			data: updatedHealthworker,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const deleteHealthworker = async (req, res) => {
	const { healthWorkerId } = req.params;

	try {
		const healthworker = await HealthWorker.findOne({
			healthWorkerId: healthWorkerId,
		});

		if (!healthworker) {
			return res.status(404).json({
				message: 'Healthworker account not found.',
			});
		}

		const deletedHealthWorker = await HealthWorker.deleteOne({
			healthWorkerId,
		});

		res.status(200).json({
			message: 'Healthworker account deleted successfully.',
			data: deletedHealthWorker,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

module.exports = {
	updateHealthworker,
	deleteHealthworker,
	getHealthWorkers,
};
