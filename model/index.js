/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

const dbConnection = require('../config/dbConnection');
const db = {};
db.sequelize = dbConnection;

db.invoices = require('./invoices');
db.packages = require('./packages');
db.msos = require('./msos');
db.stbs = require('./stbs');
db.customers = require('./customers');
db.areas = require('./areas');
db.user = require('./user');
db.userAuthSettings = require('./userAuthSettings');
db.userTokens = require('./userTokens');
db.role = require('./role');
db.projectRoute = require('./projectRoute');
db.routeRole = require('./routeRole');
db.userRole = require('./userRole');

db.invoices.belongsTo(db.packages, {
  foreignKey: 'package',
  as: '_package',
  targetKey: 'id' 
});
db.packages.hasMany(db.invoices, {
  foreignKey: 'package',
  sourceKey: 'id' 
});
db.stbs.belongsTo(db.packages, {
  foreignKey: 'package',
  as: '_package',
  targetKey: 'id' 
});
db.packages.hasMany(db.stbs, {
  foreignKey: 'package',
  sourceKey: 'id' 
});
db.invoices.belongsTo(db.msos, {
  foreignKey: 'mso',
  as: '_mso',
  targetKey: 'id' 
});
db.msos.hasOne(db.invoices, {
  foreignKey: 'mso',
  sourceKey: 'id' 
});
db.packages.belongsTo(db.msos, {
  foreignKey: 'mso',
  as: '_mso',
  targetKey: 'id' 
});
db.msos.hasOne(db.packages, {
  foreignKey: 'mso',
  sourceKey: 'id' 
});
db.stbs.belongsTo(db.msos, {
  foreignKey: 'mso',
  as: '_mso',
  targetKey: 'id' 
});
db.msos.hasOne(db.stbs, {
  foreignKey: 'mso',
  sourceKey: 'id' 
});
db.invoices.belongsTo(db.customers, {
  foreignKey: 'customer',
  as: '_customer',
  targetKey: 'id' 
});
db.customers.hasOne(db.invoices, {
  foreignKey: 'customer',
  sourceKey: 'id' 
});
db.stbs.belongsTo(db.customers, {
  foreignKey: 'customerID',
  as: '_customerID',
  targetKey: 'id' 
});
db.customers.hasOne(db.stbs, {
  foreignKey: 'customerID',
  sourceKey: 'id' 
});
db.invoices.belongsTo(db.areas, {
  foreignKey: 'area',
  as: '_area',
  targetKey: 'id' 
});
db.areas.hasMany(db.invoices, {
  foreignKey: 'area',
  sourceKey: 'id' 
});
db.stbs.belongsTo(db.areas, {
  foreignKey: 'area',
  as: '_area',
  targetKey: 'id' 
});
db.areas.hasOne(db.stbs, {
  foreignKey: 'area',
  sourceKey: 'id' 
});
db.invoices.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.invoices, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.invoices.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.invoices, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.invoices.belongsTo(db.user, {
  foreignKey: 'distributor',
  as: '_distributor',
  targetKey: 'id' 
});
db.user.hasOne(db.invoices, {
  foreignKey: 'distributor',
  sourceKey: 'id' 
});
db.invoices.belongsTo(db.user, {
  foreignKey: 'operator',
  as: '_operator',
  targetKey: 'id' 
});
db.user.hasOne(db.invoices, {
  foreignKey: 'operator',
  sourceKey: 'id' 
});
db.packages.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.packages, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.packages.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.packages, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.packages.belongsTo(db.user, {
  foreignKey: 'userID',
  as: '_userID',
  targetKey: 'id' 
});
db.user.hasOne(db.packages, {
  foreignKey: 'userID',
  sourceKey: 'id' 
});
db.msos.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.msos, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.msos.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.msos, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.stbs.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.stbs, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.stbs.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.stbs, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.customers.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.customers, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.customers.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.customers, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.customers.belongsTo(db.user, {
  foreignKey: 'operator',
  as: '_operator',
  targetKey: 'id' 
});
db.user.hasOne(db.customers, {
  foreignKey: 'operator',
  sourceKey: 'id' 
});
db.customers.belongsTo(db.user, {
  foreignKey: 'distributer',
  as: '_distributer',
  targetKey: 'id' 
});
db.user.hasOne(db.customers, {
  foreignKey: 'distributer',
  sourceKey: 'id' 
});
db.areas.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.areas, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.areas.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.areas, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.areas.belongsTo(db.user, {
  foreignKey: 'userID',
  as: '_userID',
  targetKey: 'id' 
});
db.user.hasMany(db.areas, {
  foreignKey: 'userID',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userRole, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.routeRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.userRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.projectRoute, {
  foreignKey: 'routeId',
  as: '_routeId',
  targetKey: 'id' 
});
db.projectRoute.hasMany(db.routeRole, {
  foreignKey: 'routeId',
  sourceKey: 'id' 
});

module.exports = db;