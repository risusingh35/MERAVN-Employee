const mongoose = require('mongoose');
const commonFields = require('./commonFieldsModel');
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  department: String,
  position: String,
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role' 
  },
  ...commonFields
});
const Employee = mongoose.model('Users', employeeSchema)
module.exports = Employee;
