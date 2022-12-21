/**
 * stbsController.js
 * @description :: exports action methods for stbs.
 */

const Stbs = require('../../../model/stbs');
const stbsSchemaKey = require('../../../utils/validation/stbsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Stbs in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Stbs. {status, message, data}
 */ 
const addStbs = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      stbsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdStbs = await dbService.createOne(Stbs,dataToCreate);
    return  res.success({ data :createdStbs });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Stbs in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Stbss. {status, message, data}
 */
const bulkInsertStbs = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdStbs = await dbService.createMany(Stbs,dataToCreate); 
      return  res.success({ data :{ count :createdStbs.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Stbs from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Stbs(s). {status, message, data}
 */
const findAllStbs = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundStbs;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      stbsSchemaKey.findFilterKeys,
      Stbs.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundStbs = await dbService.count(Stbs, query);
      if (!foundStbs) {
        return res.recordNotFound();
      } 
      foundStbs = { totalRecords: foundStbs };
      return res.success({ data :foundStbs });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundStbs = await dbService.paginate( Stbs,query,options);
    if (!foundStbs){
      return res.recordNotFound();
    }
    return res.success({ data:foundStbs }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Stbs from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Stbs. {status, message, data}
 */
const getStbs = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundStbs = await dbService.findOne(Stbs,{ id :id });
    if (!foundStbs){
      return res.recordNotFound();
    }
    return  res.success({ data :foundStbs });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Stbs.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getStbsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      stbsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedStbs = await dbService.count(Stbs,where);
    if (!countedStbs){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedStbs } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Stbs with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Stbs.
 * @return {Object} : updated Stbs. {status, message, data}
 */
const updateStbs = async (req, res) => {
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
      stbsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedStbs = await dbService.update(Stbs,query,dataToUpdate);
    return  res.success({ data :updatedStbs }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Stbs with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Stbss.
 * @return {Object} : updated Stbss. {status, message, data}
 */
const bulkUpdateStbs = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedStbs = await dbService.update(Stbs,filter,dataToUpdate);
    if (!updatedStbs){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedStbs.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Stbs with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Stbs.
 * @return {Object} : updated Stbs. {status, message, data}
 */
const partialUpdateStbs = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      stbsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedStbs = await dbService.update(Stbs, query, dataToUpdate);
    if (!updatedStbs) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedStbs });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Stbs from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Stbs.
 * @return {Object} : deactivated Stbs. {status, message, data}
 */
const softDeleteStbs = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Stbs, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Stbs from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Stbs. {status, message, data}
 */
const deleteStbs = async (req, res) => {
  const result = await dbService.deleteByPk(Stbs, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Stbs in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyStbs = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedStbs = await dbService.destroy(Stbs,query);
    return res.success({ data :{ count :deletedStbs.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Stbs from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Stbs.
 * @return {Object} : number of deactivated documents of Stbs. {status, message, data}
 */
const softDeleteManyStbs = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedStbs = await dbService.update(Stbs,query,updateBody, options);
    if (!updatedStbs) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedStbs.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addStbs,
  bulkInsertStbs,
  findAllStbs,
  getStbs,
  getStbsCount,
  updateStbs,
  bulkUpdateStbs,
  partialUpdateStbs,
  softDeleteStbs,
  deleteStbs,
  deleteManyStbs,
  softDeleteManyStbs,
};
