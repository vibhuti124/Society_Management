const tenantService = require('../services/tenantService');

exports.createTenant = async (req, res) => {
  try {
    const tenant = await tenantService.createTenant(req.body);
    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await tenantService.getAllTenants();
    res.json(tenants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getTenantById = async (req, res) => {
  try {
    const tenant = await tenantService.getTenantById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateTenant = async (req, res) => {
  try {
    const tenant = await tenantService.updateTenant(req.params.id, req.body);
    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteTenant = async (req, res) => {
  try {
    const tenant = await tenantService.deleteTenant(req.params.id);
    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }
    res.json({ msg: 'Tenant removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.uploadAadharCard = async (req, res) => {
  try {
    if (!req.files || !req.files.aadharCardFront || !req.files.aadharCardBack) {
      return res.status(400).json({ msg: 'Please upload both front and back of Aadhar card' });
    }

    const tenant = await tenantService.getTenantById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ msg: 'Tenant not found' });
    }

    tenant.aadharCardFront = req.files.aadharCardFront[0].path;
    tenant.aadharCardBack = req.files.aadharCardBack[0].path;
    await tenant.save();

    res.json({ msg: 'Aadhar card uploaded successfully', tenant });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
