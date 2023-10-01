const express = require('express');
const router = express.Router();
const healthworkerController = require('../controllers/healthworker.controller');

router.post('/signup', healthworkerController.signup);
router.post('/login', healthworkerController.login);
router.get('/logout', healthworkerController.logout);

module.exports = router;
