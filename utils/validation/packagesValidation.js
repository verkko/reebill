/**
 * packagesValidation.js
 * @description :: validate each post and put request as per packages model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of packages */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.any(),
  mso: joi.number().integer().allow(0),
  nameInSMS: joi.any(),
  msoPrice: joi.number().integer().allow(0),
  customerPrice: joi.number().integer().allow(0),
  userID: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of packages for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.any(),
  mso: joi.number().integer().allow(0),
  nameInSMS: joi.any(),
  msoPrice: joi.number().integer().allow(0),
  customerPrice: joi.number().integer().allow(0),
  userID: joi.number().integer().allow(0),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of packages for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      mso: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      nameInSMS: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      msoPrice: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      customerPrice: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      userID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
