const Medicine = require('../models/medicine');

const addMedicine = async (req, res) => {
	const { name, qty, patientId, dateGiven } = req.body;

	try {
		const newMedicine = await Medicine.create({
			name,
			qty,
			patientId,
			dateGiven,
		});

		return res.status(201).json({
			message: 'Medicine added to inventory successfully.',
			data: newMedicine,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};

const getMedicinesByPatient = async (req, res) => {
	const { patientId } = req.params;

	try {
		const medicines = await Medicine.find({ patientId: patientId }).populate(
			'patientId'
		);

		return res.status(201).json({
			message: 'Medicines fetched successfully.',
			data: medicines,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};

const updateMedicine = async (req, res) => {
	const filter = { _id: req.params.medicineId };
	const { updates } = req.body;

	try {
		const updatedMedicine = await Medicine.findOneAndUpdate(filter, updates, {
			returnOriginal: false,
		});

		return res.json({
			data: updatedMedicine,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};

const deleteMedicine = async (req, res) => {
	const { medicineId } = req.params;

	try {
		const deletedMedicine = await Medicine.deleteOne({ _id: medicineId });

		return res.json({
			message: 'Medicine deleted successfully.',
			data: deletedMedicine,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};

module.exports = {
	addMedicine,
	getMedicinesByPatient,
	updateMedicine,
	deleteMedicine,
};
