/**
 * invoicesValidation.js
 * @description :: validate each post and put request as per invoices model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of invoices */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  amount: joi.number().integer().allow(0),
  area: joi.number().integer().allow(0),
  customer: joi.number().integer().allow(0),
  discount: joi.number().integer().allow(0),
  distributor: joi.number().integer().allow(0),
  expiryDate: joi.date().options({ convert: true }).allow(null).allow(''),
  operator: joi.number().integer().allow(0),
  lastRenewDate: joi.date().options({ convert: true }).allow(null).allow(''),
  package: joi.number().integer().allow(0),
  payableamount: joi.number().integer().allow(0),
  paymentmode: joi.any(),
  paymentStatus: joi.any(),
  rechargeStatus: joi.any(),
  renewDate: joi.date().options({ convert: true }).allow(null).allow(''),
  transactionId: joi.any(),
  mso: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of invoices for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  amount: joi.number().integer().allow(0),
  area: joi.number().integer().allow(0),
  customer: joi.number().integer().allow(0),
  discount: joi.number().integer().allow(0),
  distributor: joi.number().integer().allow(0),
  expiryDate: joi.date().options({ convert: true }).allow(null).allow(''),
  operator: joi.number().integer().allow(0),
  lastRenewDate: joi.date().options({ convert: true }).allow(null).allow(''),
  package: joi.number().integer().allow(0),
  payableamount: joi.number().integer().allow(0),
  paymentmode: joi.any(),
  paymentStatus: joi.any(),
  rechargeStatus: joi.any(),
  renewDate: joi.date().options({ convert: true }).allow(null).allow(''),
  transactionId: joi.any(),
  mso: joi.number().integer().allow(0),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of invoices for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      amount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      area: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      customer: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      discount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      distributor: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      expiryDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      operator: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      lastRenewDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      package: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      payableamount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      paymentmode: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      paymentStatus: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      rechargeStatus: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      renewDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      transactionId: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      mso: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
