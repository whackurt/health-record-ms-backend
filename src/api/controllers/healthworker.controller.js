const bcrypt = require('bcryptjs');

const HealthWorker = require('../models/healthworker');

const signup = async (req, res) => {
	const { name, hwid, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 8);

	try {
		const newHealthWorker = await HealthWorker.create({
			name: name,
			healthWorkerId: hwid,
			password: hashedPassword,
		});

		return res.status(201).json({
			status: 'success',
			message: 'Health worker created successfully.',
		});
	} catch (error) {
		return res.status(400).json({
			status: 'error',
			message: error.message,
		});
	}
};

const login = async (req, res) => {
	const { hwid, password } = req.body;
	const user = await HealthWorker.findOne({ healthWorkerId: hwid });

	try {
		const passwordMatched = bcrypt.compareSync(password, user.password);

		if (passwordMatched) {
			return res.status(200).json({
				status: 'success',
				message: 'Login successful.',
			});
		}

		return res.status(401).json({
			status: 'error',
			message: 'Login failed.',
		});
	} catch (error) {
		res.status(400).json({
			status: 'error',
			message: error.message,
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
