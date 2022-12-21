/**
 * stbsValidation.js
 * @description :: validate each post and put request as per stbs model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of stbs */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  customerID: joi.number().integer().allow(0),
  stbNO: joi.any(),
  vcNO: joi.any(),
  mso: joi.number().integer().allow(0),
  package: joi.number().integer().allow(0),
  expiryDate: joi.date().options({ convert: true }).allow(null).allow(''),
  discount: joi.number().integer().allow(0),
  due: joi.number().integer().allow(0),
  area: joi.number().integer().allow(0),
  accountNo: joi.any()
}).unknown(true);

/** validation keys and properties of stbs for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  customerID: joi.number().integer().allow(0),
  stbNO: joi.any(),
  vcNO: joi.any(),
  mso: joi.number().integer().allow(0),
  package: joi.number().integer().allow(0),
  expiryDate: joi.date().options({ convert: true }).allow(null).allow(''),
  discount: joi.number().integer().allow(0),
  due: joi.number().integer().allow(0),
  area: joi.number().integer().allow(0),
  accountNo: joi.any(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of stbs for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      customerID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      stbNO: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      vcNO: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      mso: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      package: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      expiryDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      discount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      due: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      area: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      accountNo: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
