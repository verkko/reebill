/**
 * msos.js
 * @description :: sequelize model of database table msos
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Msos = sequelize.define('msos',{
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
  brandName:{ type:DataTypes.TEXT },
  portalLink:{ type:DataTypes.TEXT },
  logo:{ type:DataTypes.TEXT }
}
,{
  hooks:{
    beforeCreate: [
      async function (msos,options){
        msos.isActive = true;
        msos.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (msos,options){
        if (msos !== undefined && msos.length) { 
          for (let index = 0; index < msos.length; index++) { 
        
            const element = msos[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Msos.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Msos);
sequelizePaginate.paginate(Msos);
module.exports = Msos;
