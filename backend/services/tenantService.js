const Tenant = require('../models/Tenant');

exports.createTenant = async (tenantData) => {
  const tenant = new Tenant(tenantData);
  await tenant.save();
  return tenant;
};

exports.getAllTenants = async () => {
  return await Tenant.find().populate('society');
};

exports.getTenantById = async (id) => {
  return await Tenant.findById(id).populate('society');
};

exports.updateTenant = async (id, updateData) => {
  return await Tenant.findByIdAndUpdate(id, updateData, { new: true }).populate('society');
};

exports.deleteTenant = async (id) => {
  return await Tenant.findByIdAndDelete(id);
};