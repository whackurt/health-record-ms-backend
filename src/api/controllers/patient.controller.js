const Medicine = require('../models/medicine');
const Patient = require('../models/patient');

const createPatient = async (req, res) => {
	const { firstName, lastName, address, zone, birthDate } = req.body;

	try {
		const newPatient = await Patient.create({
			firstName: firstName,
			lastName: lastName,
			address: address,
			zone: zone,
			birthDate: birthDate,
		});

		return res.status(201).json({
			status: 'success',
			message: 'Patient created successfully.',
			data: newPatient,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'error',
			message: error.message,
		});
	}
};

const getPatients = async (req, res) => {
	try {
		const patients = await Patient.find().populate('zone');

		return res.json({
			status: 'success',
			data: patients,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'error',
			message: error.message,
		});
	}
};

const getPatient = async (req, res) => {
	const { patientId } = req.params;

	try {
		const patient = await Patient.find({ _id: patientId }).populate('zone');

		return res.json({
			status: 'success',
			data: patient,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'error',
			message: error.message,
		});
	}
};

const updatePatient = async (req, res) => {
	const filter = { _id: req.params.patientId };
	const { updates } = req.body;

	try {
		const updatedPatient = await Patient.findOneAndUpdate(filter, updates, {
			returnOriginal: false,
		});

		return res.json({
			status: 'success',
			data: updatedPatient,
		});
	} catch (error) {
		return res.status(400).json({
			status: 'error',
			message: error.message,
		});
	}
};

const deletePatient = async (req, res) => {
	const { patientId } = req.params;
	try {
		const patient = await Patient.deleteOne({ _id: patientId }).populate(
			'zone'
		);

		const deletedMedicines = await Medicine.deleteMany({
			patientId: patientId,
		});

		return res.json({
			status: 'success',
			message: 'Patient and medicines were deleted successfully.',
			data: { patient, deletedMedicines },
		});
	} catch (error) {
		return res.status(400).json({
			status: 'error',
			message: error.message,
		});
	}
};

module.exports = {
	createPatient,
	getPatients,
	getPatient,
	updatePatient,
	deletePatient,
};
