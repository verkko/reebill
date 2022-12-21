/**
 * packages.js
 * @description :: sequelize model of database table packages
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Packages = sequelize.define('packages',{
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
  mso:{ type:DataTypes.INTEGER },
  nameInSMS:{ type:DataTypes.TEXT },
  msoPrice:{ type:DataTypes.INTEGER },
  customerPrice:{ type:DataTypes.INTEGER },
  userID:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (packages,options){
        packages.isActive = true;
        packages.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (packages,options){
        if (packages !== undefined && packages.length) { 
          for (let index = 0; index < packages.length; index++) { 
        
            const element = packages[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Packages.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Packages);
sequelizePaginate.paginate(Packages);
module.exports = Packages;
