const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HealthWorker = require('../models/healthworker');

const signup = async (req, res) => {
	try {
		const { name, hwid, password } = req.body;

		const existingUser = await HealthWorker.findOne({ hwid });

		if (existingUser) {
			return res
				.status(400)
				.json({ message: 'Healthworker ID is already taken.' });
		}

		const hashedPassword = bcrypt.hashSync(password, 8);

		const newHealthWorker = new HealthWorker({
			name: name,
			healthWorkerId: hwid,
			password: hashedPassword,
		});

		await newHealthWorker.save();

		res.status(201).json({ message: 'Healthworker registered successfully.' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { hwid, password } = req.body;
		const user = await HealthWorker.findOne({ healthWorkerId: hwid });

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials.' });
		}

		const passwordMatched = await bcrypt.compareSync(password, user.password);

		if (!passwordMatched) {
			return res.status(401).json({ message: 'Invalid credentials.' });
		}

		const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
			expiresIn: '12h', // Token expiration time (adjust as needed)
		});

		res.status(200).json({ userId: user._id, token });
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
