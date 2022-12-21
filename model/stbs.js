/**
 * stbs.js
 * @description :: sequelize model of database table stbs
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Stbs = sequelize.define('stbs',{
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
  customerID:{ type:DataTypes.INTEGER },
  stbNO:{ type:DataTypes.TEXT },
  vcNO:{ type:DataTypes.TEXT },
  mso:{ type:DataTypes.INTEGER },
  package:{ type:DataTypes.INTEGER },
  expiryDate:{ type:DataTypes.DATE },
  discount:{ type:DataTypes.INTEGER },
  due:{ type:DataTypes.INTEGER },
  area:{ type:DataTypes.INTEGER },
  accountNo:{ type:DataTypes.TEXT }
}
,{
  hooks:{
    beforeCreate: [
      async function (stbs,options){
        stbs.isActive = true;
        stbs.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (stbs,options){
        if (stbs !== undefined && stbs.length) { 
          for (let index = 0; index < stbs.length; index++) { 
        
            const element = stbs[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Stbs.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Stbs);
sequelizePaginate.paginate(Stbs);
module.exports = Stbs;
