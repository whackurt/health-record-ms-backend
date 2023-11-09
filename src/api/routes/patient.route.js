const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/:patientId', verifyToken, patientController.getPatient);
router.get('/', verifyToken, patientController.getPatients);
router.post('/', verifyToken, patientController.createPatient);
router.delete('/:patientId', verifyToken, patientController.deletePatient);
router.put('/:patientId', verifyToken, patientController.updatePatient);

module.exports = router;
