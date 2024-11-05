const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { sendOTP, verifyOTP, resetPassword } = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password/send-otp', sendOTP);
router.post('/forgot-password/verify-otp', verifyOTP);
router.post('/forgot-password/reset', resetPassword);


module.exports = router;