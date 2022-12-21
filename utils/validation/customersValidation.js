/**
 * customersValidation.js
 * @description :: validate each post and put request as per customers model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of customers */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.any(),
  email: joi.any(),
  mobile: joi.any(),
  address: joi.any(),
  operator: joi.number().integer().allow(0),
  distributer: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of customers for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.any(),
  email: joi.any(),
  mobile: joi.any(),
  address: joi.any(),
  operator: joi.number().integer().allow(0),
  distributer: joi.number().integer().allow(0),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of customers for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      mobile: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      address: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      operator: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      distributer: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
