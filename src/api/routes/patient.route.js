const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');

router.get('/:patientId', patientController.getPatient);
router.get('/', patientController.getPatients);
router.post('/', patientController.createPatient);
router.delete('/:patientId', patientController.deletePatient);
router.put('/:patientId', patientController.updatePatient);

module.exports = router;
