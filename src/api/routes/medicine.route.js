const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicine.controller');

router.get('/:patientId', medicineController.getMedicinesByPatient);
router.post('/', medicineController.addMedicine);
router.delete('/:medicineId', medicineController.deleteMedicine);

module.exports = router;
