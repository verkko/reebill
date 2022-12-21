/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');  
 
const authConstantDefault = require('../../constants/authConstant');    

/** validation keys and properties of user */
exports.schemaKeys = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.valid(...convertObjectToEnum(authConstantDefault.USER_TYPES)),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  assignedAreas: joi.any(),
  commission: joi.number().integer().allow(0),
  distributor: joi.any(),
  gender: joi.any(),
  image: joi.any(),
  lco: joi.number().integer().allow(0),
  mobile: joi.any(),
  role: joi.any(),
  wallet: joi.boolean(),
  walletBalance: joi.number().integer().allow(0),
  mobileNo: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of user for updation */
exports.updateSchemaKeys = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.valid(...convertObjectToEnum(authConstantDefault.USER_TYPES)),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  assignedAreas: joi.any(),
  commission: joi.number().integer().allow(0),
  distributor: joi.any(),
  gender: joi.any(),
  image: joi.any(),
  lco: joi.number().integer().allow(0),
  mobile: joi.any(),
  role: joi.any(),
  wallet: joi.boolean(),
  walletBalance: joi.number().integer().allow(0),
  mobileNo: joi.string().allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      assignedAreas: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      commission: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      distributor: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      gender: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      lco: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      mobile: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      role: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      wallet: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      walletBalance: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
