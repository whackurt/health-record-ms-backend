const bcrypt = require('bcryptjs');

const HealthWorker = require('../models/healthworker');

const signup = async (req, res) => {
	const { name, hwid, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 8);

	try {
		const userExists = await HealthWorker.find({ hwid });

		if (userExists) {
			res.status(401).json({
				status: 'error',
				message: 'ID is taken already.',
			});
		}

		await HealthWorker.create({
			name: name,
			healthWorkerId: hwid,
			password: hashedPassword,
		}).then((_res) => {
			if (_res) {
				res.status(201).json({
					status: 'success',
					message: 'Health worker created successfully.',
				});
			}
		});
	} catch (error) {
		res.status(400).json({
			status: 'error',
			message: 'Failed to create health worker.',
		});
	}
};

const login = async (req, res) => {
	const { hwid, password } = req.body;
	const user = await HealthWorker.findOne({ healthWorkerId: hwid });

	try {
		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'Healthworker not found.',
			});
		}

		const passwordMatched = bcrypt.compareSync(password, user.password);

		if (passwordMatched) {
			res.status(200).json({
				status: 'success',
				message: 'Login successful.',
			});
		}
	} catch (error) {
		res.status(400).json({
			status: 'error',
			message: 'Login failed.',
		});
	}
};

const logout = async (req, res) => {
	try {
	} catch (error) {}
};

module.exports = {
	signup,
	login,
	logout,
};
