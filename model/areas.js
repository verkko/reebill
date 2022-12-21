/**
 * areas.js
 * @description :: sequelize model of database table areas
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Areas = sequelize.define('areas',{
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
  areaName:{ type:DataTypes.TEXT },
  village:{ type:DataTypes.TEXT },
  mandal:{ type:DataTypes.TEXT },
  district:{ type:DataTypes.TEXT },
  state:{ type:DataTypes.TEXT },
  pincode:{ type:DataTypes.TEXT },
  userID:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (areas,options){
        areas.isActive = true;
        areas.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (areas,options){
        if (areas !== undefined && areas.length) { 
          for (let index = 0; index < areas.length; index++) { 
        
            const element = areas[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Areas.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Areas);
sequelizePaginate.paginate(Areas);
module.exports = Areas;
