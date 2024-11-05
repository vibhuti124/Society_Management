const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, tenantController.createTenant);
router.get('/', auth, tenantController.getAllTenants);
router.get('/:id', auth, tenantController.getTenantById);
router.put('/:id', auth, tenantController.updateTenant);
router.delete('/:id', auth, tenantController.deleteTenant);
router.post('/:id/upload-aadhar', auth, upload.fields([
  { name: 'aadharCardFront', maxCount: 1 },
  { name: 'aadharCardBack', maxCount: 1 }
]), tenantController.uploadAadharCard);

module.exports = router;