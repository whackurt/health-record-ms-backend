const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HealthWorker = require('../models/healthworker');
const Admin = require('../models/admin');

const createHealthworker = async (req, res) => {
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

const loginHealthworker = async (req, res) => {
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

		const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

		res.status(200).json({ userId: user._id, userName: user.name, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteHealthworker = async (req, res) => {
	try {
		const { healthWorkerId } = req.params;

		const healthworker = await HealthWorker.findOne({ healthWorkerId });

		if (!healthworker) {
			res.status(404).json({ message: 'Healthworker not found.' });
			return;
		}

		const deletedHealthWorker = await HealthWorker.deleteOne({
			healthWorkerId,
		});

		res.status(200).json({
			message: 'HealthWorker deleted successfully.',
			data: deletedHealthWorker,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const adminSignup = async (req, res) => {
	try {
		const { username, password } = req.body;
		const hashedPassword = bcrypt.hashSync(password, 8);

		const newAdmin = new Admin({
			username,
			password: hashedPassword,
		});

		const registeredAdmin = await newAdmin.save();

		res.status(201).json({
			message: 'Admin created successfully.',
			adminId: registeredAdmin._id,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const adminLogin = async (req, res) => {
	try {
		const { username, password } = req.body;

		const admin = await Admin.findOne({ username });

		if (!admin) {
			res.status(401).json({ message: 'Invalid credentials.' });
			return;
		}

		const passwordMatched = await bcrypt.compareSync(password, admin.password);

		if (!passwordMatched) {
			res.status(401).json({ message: 'Invalid credentials.' });
			return;
		}

		const token = jwt.sign({ adminId: admin._id }, process.env.TOKEN_SECRET);

		res
			.status(200)
			.json({ adminId: admin._id, username: admin.username, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const logout = async (req, res) => {
	try {
	} catch (error) {}
};

module.exports = {
	createHealthworker,
	loginHealthworker,
	deleteHealthworker,
	logout,
	adminLogin,
	adminSignup,
};
