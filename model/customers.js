/**
 * customers.js
 * @description :: sequelize model of database table customers
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Customers = sequelize.define('customers',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  name:{ type:DataTypes.TEXT },
  email:{ type:DataTypes.TEXT },
  mobile:{ type:DataTypes.TEXT },
  address:{ type:DataTypes.TEXT },
  operator:{ type:DataTypes.INTEGER },
  distributer:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (customers,options){
        customers.isActive = true;
        customers.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (customers,options){
        if (customers !== undefined && customers.length) { 
          for (let index = 0; index < customers.length; index++) { 
        
            const element = customers[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Customers.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Customers);
sequelizePaginate.paginate(Customers);
module.exports = Customers;
