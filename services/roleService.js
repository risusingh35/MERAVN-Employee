const Role = require('../models/roleModel');
const bcrypt = require('bcrypt');
class RoleService {
  async  getAllRole(page = 1, perPage = 10, searchTerm = '') {
    let query = {};
    if (searchTerm) {
      query = {
        $or: [
          { description: { $regex: searchTerm, $options: 'i' } },
          { name: { $regex: searchTerm, $options: 'i' } },
        ],
      };
    }
  
    const totalRoles = await Role.countDocuments(query);
    const totalPages = Math.ceil(totalRoles / perPage);
    const skip = (page - 1) * perPage;
  
    const roles = await Role.find(query, { __v: 0, password: 0 })
      .skip(skip)
      .limit(perPage)
      .exec();
  
    return {
      roles,
      totalPages,
      currentPage: page,
      totalRoles,
    };
  }
  
  async createRole(RoleData) {
    const newRole = new Role({ name: RoleData.name, description: RoleData.description, createdAt: Date() });
    await newRole.save();
    return await newRole.save(RoleData)
      .then((res) => {
        return { message: `Role ${newRole.name} Created successfully`, statusCode: 200 }
      }).catch((e) => {
        return { error: e.message, statusCode: 500 }
      })

  }
  async getRoleById(id) {
    try {
      const role = await Role.findById(id, { __v: 0 });

      if (!role) {
        return { error: 'Role not found', statusCode: 400 }
      }
      return role
    } catch (e) {
      return { error: e.message, statusCode: 500 }
    }
  }
  async updateRole(RoleId, updateData) {
    try {
      const role = await Role.findById(RoleId);

      if (!role) {
        return { error: 'Role not found', statusCode: 404 };
      }

      // Update specific fields
      if (updateData.name) {
        role.name = updateData.name;
      }
      if (updateData.description) {
        role.description = updateData.description;
      }
      role.updatedAt = Date.now();
      const updatedRole = await role.save();
      return { message: 'Role updated successfully', statusCode: 200, updatedRole };
    } catch (error) {
      return { error: error.message, statusCode: 500 };
    }
  }

}

module.exports = new RoleService();
