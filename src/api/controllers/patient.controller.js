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

		res.status(201).json({
			message: 'Patient created successfully.',
			data: newPatient,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const getPatients = async (req, res) => {
	try {
		const patients = await Patient.find().populate('zone');

		res.status(200).json({
			data: patients,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const getPatientById = async (req, res) => {
	const { patientId } = req.params;

	try {
		const patient = await Patient.find({ _id: patientId }).populate('zone');

		if (!patient) {
			res.status(404).json({ message: 'Patient not found' });
		}

		res.status(200).json({
			data: patient,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const getPatientByZone = async (req, res) => {
	const { zoneId } = req.params;

	try {
		const patient = await Patient.find({ zone: zoneId }).populate('zone');

		if (!patient) {
			res.status(404).json({ message: 'Patient not found' });
		}

		res.status(200).json({
			data: patient,
		});
	} catch (error) {
		res.status(400).json({
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

		res.status(200).json({
			data: updatedPatient,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const deletePatient = async (req, res) => {
	const { patientId } = req.params;
	try {
		const patientExist = await Patient.findOne({ _id: patientId });

		if (!patientExist) {
			res.status(404).json({
				message: 'Patient not found.',
				data: {},
			});
			return;
		} else {
			const patient = await Patient.deleteOne({ _id: patientId }).populate(
				'zone'
			);

			const deletedMedicines = await Medicine.deleteMany({
				patientId: patientId,
			});

			res.status(200).json({
				message: 'Patient and medicines were deleted successfully.',
				data: { patient, deletedMedicines },
			});
		}
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

module.exports = {
	createPatient,
	getPatients,
	getPatientById,
	getPatientByZone,
	updatePatient,
	deletePatient,
};
