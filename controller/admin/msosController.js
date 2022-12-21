/**
 * msosController.js
 * @description :: exports action methods for msos.
 */

const Msos = require('../../model/msos');
const msosSchemaKey = require('../../utils/validation/msosValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Msos in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Msos. {status, message, data}
 */ 
const addMsos = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      msosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdMsos = await dbService.createOne(Msos,dataToCreate);
    return  res.success({ data :createdMsos });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Msos in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Msoss. {status, message, data}
 */
const bulkInsertMsos = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdMsos = await dbService.createMany(Msos,dataToCreate); 
      return  res.success({ data :{ count :createdMsos.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Msos from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Msos(s). {status, message, data}
 */
const findAllMsos = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundMsos;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      msosSchemaKey.findFilterKeys,
      Msos.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundMsos = await dbService.count(Msos, query);
      if (!foundMsos) {
        return res.recordNotFound();
      } 
      foundMsos = { totalRecords: foundMsos };
      return res.success({ data :foundMsos });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundMsos = await dbService.paginate( Msos,query,options);
    if (!foundMsos){
      return res.recordNotFound();
    }
    return res.success({ data:foundMsos }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Msos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Msos. {status, message, data}
 */
const getMsos = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundMsos = await dbService.findOne(Msos,{ id :id });
    if (!foundMsos){
      return res.recordNotFound();
    }
    return  res.success({ data :foundMsos });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Msos.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getMsosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      msosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedMsos = await dbService.count(Msos,where);
    if (!countedMsos){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedMsos } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Msos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Msos.
 * @return {Object} : updated Msos. {status, message, data}
 */
const updateMsos = async (req, res) => {
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
      msosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedMsos = await dbService.update(Msos,query,dataToUpdate);
    return  res.success({ data :updatedMsos }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Msos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Msoss.
 * @return {Object} : updated Msoss. {status, message, data}
 */
const bulkUpdateMsos = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedMsos = await dbService.update(Msos,filter,dataToUpdate);
    if (!updatedMsos){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedMsos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Msos with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Msos.
 * @return {Object} : updated Msos. {status, message, data}
 */
const partialUpdateMsos = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      msosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedMsos = await dbService.update(Msos, query, dataToUpdate);
    if (!updatedMsos) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedMsos });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Msos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Msos.
 * @return {Object} : deactivated Msos. {status, message, data}
 */
const softDeleteMsos = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedMsos = await deleteDependentService.softDeleteMsos(query, updateBody);
    if (!updatedMsos){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedMsos });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Msos from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Msos. {status, message, data}
 */
const deleteMsos = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedMsos = await deleteDependentService.countMsos(query);
      if (!countedMsos){
        return res.recordNotFound();
      }
      return res.success({ data :countedMsos });
    }
    let deletedMsos = await deleteDependentService.deleteUser(query);
    if (!deletedMsos){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedMsos });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Msos in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyMsos = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedMsos = await deleteDependentService.countMsos(query);
      if (!countedMsos) {
        return res.recordNotFound();
      }
      return res.success({ data: countedMsos });            
    }
    let deletedMsos = await deleteDependentService.deleteMsos(query);
    if (!deletedMsos) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedMsos });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Msos from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Msos.
 * @return {Object} : number of deactivated documents of Msos. {status, message, data}
 */
const softDeleteManyMsos = async (req, res) => {
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
    let updatedMsos = await deleteDependentService.softDeleteMsos(query, updateBody);
    if (!updatedMsos) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedMsos });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addMsos,
  bulkInsertMsos,
  findAllMsos,
  getMsos,
  getMsosCount,
  updateMsos,
  bulkUpdateMsos,
  partialUpdateMsos,
  softDeleteMsos,
  deleteMsos,
  deleteManyMsos,
  softDeleteManyMsos,
};
