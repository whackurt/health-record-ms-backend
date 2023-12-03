const { verifyToken } = require('../middlewares/verifyToken');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/admin/signup', authController.adminSignup);
router.post('/admin/login', authController.adminLogin);
router.post(
	'/healthworker/create',
	verifyToken,
	authController.createHealthworker
);
router.post('/healthworker/login', authController.loginHealthworker);
router.delete(
	'/healthworker/delete/:healthWorkerId',
	verifyToken,
	authController.deleteHealthworker
);
router.get('/logout', authController.logout);

module.exports = router;
