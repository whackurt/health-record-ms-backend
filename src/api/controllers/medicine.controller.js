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

		res.status(201).json({
			message: 'Medicine added to inventory successfully.',
			data: newMedicine,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const getMedicines = async (req, res) => {
	try {
		const medicines = await Medicine.find().populate('patientId');

		res.status(200).json({
			message: 'Medicines fetched successfully.',
			data: medicines,
		});
	} catch (error) {
		res.status(400).json({
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

		res.status(200).json({
			message: 'Medicines fetched successfully.',
			data: medicines,
		});
	} catch (error) {
		res.status(400).json({
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

		res.status(200).json({
			data: updatedMedicine,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const deleteMedicine = async (req, res) => {
	const { medicineId } = req.params;

	try {
		const deletedMedicine = await Medicine.deleteOne({ _id: medicineId });

		res.status(200).json({
			message: 'Medicine deleted successfully.',
			data: deletedMedicine,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

module.exports = {
	addMedicine,
	getMedicines,
	getMedicinesByPatient,
	updateMedicine,
	deleteMedicine,
};
