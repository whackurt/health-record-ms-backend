const { verifyToken } = require('../middlewares/verifyToken');
const express = require('express');
const router = express.Router();
const healthWorkerController = require('../controllers/healthworker.controller');

router.get('/', verifyToken, healthWorkerController.getHealthWorkers);

router.put(
	'/:healthWorkerId',
	verifyToken,
	healthWorkerController.updateHealthworker
);

router.delete(
	'/:healthWorkerId',
	verifyToken,
	healthWorkerController.deleteHealthworker
);

module.exports = router;
