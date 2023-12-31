const Employee = require('../models/employeeModel');
const Role = require('../models/roleModel');
class LoginService {
  async getUserByEmail(email) {
    try {
      const user = await Employee.findOne({ email }, { __v: 0 }).populate('roleId', 'name');

      if (!user) {
        return { error: 'user not found', statusCode: 404 };
      }
      
      return user;
    } catch (error) {
      return { error: error.message, statusCode: 500 };
    }
  }
}

module.exports = new LoginService();
