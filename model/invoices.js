/**
 * invoices.js
 * @description :: sequelize model of database table invoices
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Invoices = sequelize.define('invoices',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  amount:{ type:DataTypes.INTEGER },
  area:{ type:DataTypes.INTEGER },
  customer:{ type:DataTypes.INTEGER },
  discount:{ type:DataTypes.INTEGER },
  distributor:{ type:DataTypes.INTEGER },
  expiryDate:{ type:DataTypes.DATE },
  operator:{ type:DataTypes.INTEGER },
  lastRenewDate:{ type:DataTypes.DATE },
  package:{ type:DataTypes.INTEGER },
  payableamount:{ type:DataTypes.INTEGER },
  paymentmode:{ type:DataTypes.TEXT },
  paymentStatus:{ type:DataTypes.TEXT },
  rechargeStatus:{ type:DataTypes.TEXT },
  renewDate:{ type:DataTypes.DATE },
  transactionId:{ type:DataTypes.TEXT },
  mso:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (invoices,options){
        invoices.isActive = true;
        invoices.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (invoices,options){
        if (invoices !== undefined && invoices.length) { 
          for (let index = 0; index < invoices.length; index++) { 
        
            const element = invoices[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Invoices.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Invoices);
sequelizePaginate.paginate(Invoices);
module.exports = Invoices;
