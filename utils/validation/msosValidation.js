/**
 * msosValidation.js
 * @description :: validate each post and put request as per msos model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of msos */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  brandName: joi.any(),
  portalLink: joi.any(),
  logo: joi.any()
}).unknown(true);

/** validation keys and properties of msos for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  brandName: joi.any(),
  portalLink: joi.any(),
  logo: joi.any(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of msos for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      brandName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      portalLink: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      logo: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
