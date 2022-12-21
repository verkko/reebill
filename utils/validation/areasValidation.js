/**
 * areasValidation.js
 * @description :: validate each post and put request as per areas model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of areas */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  areaName: joi.any(),
  village: joi.any(),
  mandal: joi.any(),
  district: joi.any(),
  state: joi.any(),
  pincode: joi.any(),
  userID: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of areas for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  areaName: joi.any(),
  village: joi.any(),
  mandal: joi.any(),
  district: joi.any(),
  state: joi.any(),
  pincode: joi.any(),
  userID: joi.number().integer().allow(0),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of areas for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      areaName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      village: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      mandal: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      district: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      state: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      pincode: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      userID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
