const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicine.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.get(
	'/:patientId',
	verifyToken,
	medicineController.getMedicinesByPatient
);
router.get('/', verifyToken, medicineController.getMedicines);
router.post('/', verifyToken, medicineController.addMedicine);
router.put('/:medicineId', verifyToken, medicineController.updateMedicine);
router.delete('/:medicineId', verifyToken, medicineController.deleteMedicine);

module.exports = router;
