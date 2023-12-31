const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController')
router.get('/', employeeController.getAllEmployee);
router.post('/', employeeController.createEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
module.exports = router;
