const Employee = require('../models/employeeModel');
const bcrypt = require('bcrypt');
class EmployeeService {
  // async getAllEmployee() {
  //   return await Employee.find({}, { __v: 0, password: 0 })
  // }
  async  getAllEmployee(page = 1, perPage = 10, searchTerm = '') {
    try {
      let query = {};
      if (searchTerm) {
        query = {
          $or: [
            { email: { $regex: searchTerm, $options: 'i' } },
            { name: { $regex: searchTerm, $options: 'i' } },
          ],
        };
      }
    
      const totalEmployee = await Employee.countDocuments(query);
      const totalPages = Math.ceil(totalEmployee / perPage);
      const skip = (page - 1) * perPage;
    
      const employee = await Employee.find(query, { __v: 0, password: 0 })
        .skip(skip)
        .limit(perPage)
        .exec();
    
      return {
        employee,
        totalPages,
        currentPage: page,
        totalEmployee,
      };
    } catch (error) {
      console.log('Error in employeeService.getAllEmployee ',error);
    }

  }
  async createEmployee(employeeData) {
    const hashedPassword = await bcrypt.hash('password', 10);
    const newEmployee = new Employee({
      name: 'RK Singh92',
      email: 'risusingh35@gmail.com',
      contact: '+917771815989',
      department: 'Engineering',
      position: 'Software Developer',
      password: hashedPassword,
      createdAt: Date()
    });
    return await newEmployee.save()
      .then((res) => {
        return { message: `Employee ${newEmployee.name} Created successfully`, statusCode: 200 }
      }).catch((e) => {
        return { error: e.message, statusCode: 500 }
      })

  }
  async getEmployeeById(id) {
    try {
      const employee = await Employee.findById(id, { __v: 0 });

      if (!employee) {
        return { error: 'Employee not found', statusCode: 400 }
      }
      return employee
    } catch (e) {
      return { error: e.message, statusCode: 500 }
    }
  }
  async updateEmployee(employeeId, updateData) {
    try {
      // Find the employee by ID
      console.log('updateData---', updateData);
      const employee = await Employee.findById(employeeId);

      if (!employee) {
        return { error: 'Employee not found', statusCode: 404 };
      }

      // Update specific fields
      if (updateData.name) {
        employee.name = updateData.name;
      }
      if (updateData.email) {
        employee.email = updateData.email;
      }
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      if (updateData.password) {
        employee.password = hashedPassword;
      }
      employee.updatedAt = Date.now();
      const updatedEmployee = await employee.save();
      return { message: 'Employee updated successfully', statusCode: 200, updatedEmployee };
    } catch (error) {
      return { error: error.message, statusCode: 500 };
    }
  }

}

module.exports = new EmployeeService();
