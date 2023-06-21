const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`${role} is not registered in the DB`);
  }
};

// EMAIL EXISTS VERIFICATION  *!
const isEmailExistent = async (email = '') => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`${email} is already in use`);
  }
};

const userExistsById = async id => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`ID: ${id} is non-existent`);
  }
};

module.exports = { isValidRole, isEmailExistent, userExistsById };
