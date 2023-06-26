const validateFields = require('./validateFields');
const validateJWT = require('./validate-jwt');
const validateRoles = require('./validate-roles');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
};
