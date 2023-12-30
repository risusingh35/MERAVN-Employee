const roleService = require('../services/roleService');

exports.getAllRole = async (req, res) => {
  try {
    const role = await roleService.getAllRole(req.query.page,req.query.perPage,req.query.searchTerm);
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRole = async (req, res) => {
  const roleData = req.body;
  try {
    const newRole = await roleService.createRole(roleData);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getRoleById = async (req, res) => {
    const id = req.params.id;
    try {
      const role = await roleService.getRoleById(id);
      res.json(role);
    } catch (error) {
      res.status(404).json({ error: 'role not found' });
    }
  };
exports.updateRole = async (req, res) => {
    const id = req.params.id;
    try {
      const role = await roleService.updateRole(id,req.body);
      res.json(role);
    } catch (error) {
      res.status(404).json({ error: 'role not found' });
    }
  };
