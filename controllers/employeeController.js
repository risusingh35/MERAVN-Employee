const employeeService = require('../services/employeeService');

exports.getAllEmployee = async (req, res) => {
  try {
    const employee = await employeeService.getAllEmployee(req.query.page,req.query.perPage,req.query.searchTerm);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  const employeeData = req.body;
  try {
    const newEmp = await employeeService.createEmployee(employeeData);
    res.status(201).json(newEmp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getEmployeeById = async (req, res) => {
    const id = req.params.id;
    try {
      const Employee = await employeeService.getEmployeeById(id);
      res.json(Employee);
    } catch (error) {
      res.status(404).json({ error: 'Employee not found' });
    }
  };
exports.updateEmployee = async (req, res) => {
    const id = req.params.id;
    try {
      const Employee = await employeeService.updateEmployee(id,req.body);
      res.json(Employee);
    } catch (error) {
      res.status(404).json({ error: 'Employee not found' });
    }
  };
