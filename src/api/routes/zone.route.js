const express = require('express');
const router = express.Router();
const zoneController = require('../controllers/zone.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/', verifyToken, zoneController.getZones);
router.post('/', verifyToken, zoneController.createZone);
router.put('/:zoneId', verifyToken, zoneController.updateZone);
router.delete('/:zoneId', verifyToken, zoneController.deleteZone);

module.exports = router;
