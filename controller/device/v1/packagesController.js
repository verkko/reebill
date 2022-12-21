/**
 * packagesController.js
 * @description :: exports action methods for packages.
 */

const Packages = require('../../../model/packages');
const packagesSchemaKey = require('../../../utils/validation/packagesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Packages in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Packages. {status, message, data}
 */ 
const addPackages = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      packagesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPackages = await dbService.createOne(Packages,dataToCreate);
    return  res.success({ data :createdPackages });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Packages in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Packagess. {status, message, data}
 */
const bulkInsertPackages = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPackages = await dbService.createMany(Packages,dataToCreate); 
      return  res.success({ data :{ count :createdPackages.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Packages from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Packages(s). {status, message, data}
 */
const findAllPackages = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPackages;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      packagesSchemaKey.findFilterKeys,
      Packages.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPackages = await dbService.count(Packages, query);
      if (!foundPackages) {
        return res.recordNotFound();
      } 
      foundPackages = { totalRecords: foundPackages };
      return res.success({ data :foundPackages });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPackages = await dbService.paginate( Packages,query,options);
    if (!foundPackages){
      return res.recordNotFound();
    }
    return res.success({ data:foundPackages }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Packages from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Packages. {status, message, data}
 */
const getPackages = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPackages = await dbService.findOne(Packages,{ id :id });
    if (!foundPackages){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPackages });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Packages.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPackagesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      packagesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPackages = await dbService.count(Packages,where);
    if (!countedPackages){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPackages } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Packages with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Packages.
 * @return {Object} : updated Packages. {status, message, data}
 */
const updatePackages = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      packagesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPackages = await dbService.update(Packages,query,dataToUpdate);
    return  res.success({ data :updatedPackages }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Packages with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Packagess.
 * @return {Object} : updated Packagess. {status, message, data}
 */
const bulkUpdatePackages = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPackages = await dbService.update(Packages,filter,dataToUpdate);
    if (!updatedPackages){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPackages.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Packages with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Packages.
 * @return {Object} : updated Packages. {status, message, data}
 */
const partialUpdatePackages = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      packagesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPackages = await dbService.update(Packages, query, dataToUpdate);
    if (!updatedPackages) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPackages });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Packages from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Packages.
 * @return {Object} : deactivated Packages. {status, message, data}
 */
const softDeletePackages = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedPackages = await deleteDependentService.softDeletePackages(query, updateBody);
    if (!updatedPackages){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedPackages });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Packages from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Packages. {status, message, data}
 */
const deletePackages = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedPackages = await deleteDependentService.countPackages(query);
      if (!countedPackages){
        return res.recordNotFound();
      }
      return res.success({ data :countedPackages });
    }
    let deletedPackages = await deleteDependentService.deleteUser(query);
    if (!deletedPackages){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedPackages });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Packages in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPackages = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedPackages = await deleteDependentService.countPackages(query);
      if (!countedPackages) {
        return res.recordNotFound();
      }
      return res.success({ data: countedPackages });            
    }
    let deletedPackages = await deleteDependentService.deletePackages(query);
    if (!deletedPackages) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedPackages });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Packages from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Packages.
 * @return {Object} : number of deactivated documents of Packages. {status, message, data}
 */
const softDeleteManyPackages = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedPackages = await deleteDependentService.softDeletePackages(query, updateBody);
    if (!updatedPackages) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedPackages });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPackages,
  bulkInsertPackages,
  findAllPackages,
  getPackages,
  getPackagesCount,
  updatePackages,
  bulkUpdatePackages,
  partialUpdatePackages,
  softDeletePackages,
  deletePackages,
  deleteManyPackages,
  softDeleteManyPackages,
};
