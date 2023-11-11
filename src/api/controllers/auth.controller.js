const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HealthWorker = require('../models/healthworker');

const signup = async (req, res) => {
	try {
		const { name, hwid, password } = req.body;

		const existingUser = await HealthWorker.findOne({ hwid });

		if (existingUser) {
			res.status(400).json({ message: 'Healthworker ID is already taken.' });
			return;
		}

		const hashedPassword = bcrypt.hashSync(password, 8);

		const newHealthWorker = new HealthWorker({
			name: name,
			healthWorkerId: hwid,
			password: hashedPassword,
		});

		const registered = await newHealthWorker.save();

		res.status(201).json({
			message: 'Healthworker registered successfully.',
			healthWorkerId: registered.healthWorkerId,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { hwid, password } = req.body;
		const user = await HealthWorker.findOne({ healthWorkerId: hwid });

		if (!user) {
			res.status(401).json({ message: 'Invalid credentials.' });
			return;
		}

		const passwordMatched = await bcrypt.compareSync(password, user.password);

		if (!passwordMatched) {
			res.status(401).json({ message: 'Invalid credentials.' });
			return;
		}

		const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
			expiresIn: '12h', // Token expiration time (adjust as needed)
		});

		res.status(200).json({ userId: user._id, userName: user.name, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
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
