const { Role, Category, User, Product } = require('../models');

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

const categoryExistsById = async id => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists) {
    throw new Error(`ID: ${id} is non-existent`);
  }
};

const productExistsById = async id => {
  const productExists = await Product.findById(id);
  if (!productExists) {
    throw new Error(`ID: ${id} is non-existent`);
  }
};

module.exports = {
  isValidRole,
  isEmailExistent,
  userExistsById,
  categoryExistsById,
  productExistsById,
};
