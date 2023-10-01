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
			status: 'success',
			message: 'Medicine added to inventory successfully.',
			data: newMedicine,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'error',
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
			status: 'success',
			message: 'Medicines fetched successfully.',
			data: medicines,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'error',
			message: error.message,
		});
	}
};

const deleteMedicine = async (req, res) => {
	const { medicineId } = req.params;

	try {
		const deletedMedicine = await Medicine.deleteOne({ _id: medicineId });

		return res.json({
			status: 'success',
			message: 'Medicine  deleted successfully.',
			data: deletedMedicine,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'error',
			message: error.message,
		});
	}
};

module.exports = {
	addMedicine,
	getMedicinesByPatient,
	deleteMedicine,
};
