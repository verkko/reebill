/**
 * areasController.js
 * @description :: exports action methods for areas.
 */

const Areas = require('../../../model/areas');
const areasSchemaKey = require('../../../utils/validation/areasValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Areas in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Areas. {status, message, data}
 */ 
const addAreas = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      areasSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAreas = await dbService.createOne(Areas,dataToCreate);
    return  res.success({ data :createdAreas });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Areas in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Areass. {status, message, data}
 */
const bulkInsertAreas = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAreas = await dbService.createMany(Areas,dataToCreate); 
      return  res.success({ data :{ count :createdAreas.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Areas from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Areas(s). {status, message, data}
 */
const findAllAreas = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAreas;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      areasSchemaKey.findFilterKeys,
      Areas.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAreas = await dbService.count(Areas, query);
      if (!foundAreas) {
        return res.recordNotFound();
      } 
      foundAreas = { totalRecords: foundAreas };
      return res.success({ data :foundAreas });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAreas = await dbService.paginate( Areas,query,options);
    if (!foundAreas){
      return res.recordNotFound();
    }
    return res.success({ data:foundAreas }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Areas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Areas. {status, message, data}
 */
const getAreas = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAreas = await dbService.findOne(Areas,{ id :id });
    if (!foundAreas){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAreas });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Areas.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAreasCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      areasSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAreas = await dbService.count(Areas,where);
    if (!countedAreas){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAreas } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Areas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Areas.
 * @return {Object} : updated Areas. {status, message, data}
 */
const updateAreas = async (req, res) => {
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
      areasSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAreas = await dbService.update(Areas,query,dataToUpdate);
    return  res.success({ data :updatedAreas }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Areas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Areass.
 * @return {Object} : updated Areass. {status, message, data}
 */
const bulkUpdateAreas = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAreas = await dbService.update(Areas,filter,dataToUpdate);
    if (!updatedAreas){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAreas.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Areas with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Areas.
 * @return {Object} : updated Areas. {status, message, data}
 */
const partialUpdateAreas = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      areasSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAreas = await dbService.update(Areas, query, dataToUpdate);
    if (!updatedAreas) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAreas });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Areas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Areas.
 * @return {Object} : deactivated Areas. {status, message, data}
 */
const softDeleteAreas = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedAreas = await deleteDependentService.softDeleteAreas(query, updateBody);
    if (!updatedAreas){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedAreas });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Areas from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Areas. {status, message, data}
 */
const deleteAreas = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedAreas = await deleteDependentService.countAreas(query);
      if (!countedAreas){
        return res.recordNotFound();
      }
      return res.success({ data :countedAreas });
    }
    let deletedAreas = await deleteDependentService.deleteUser(query);
    if (!deletedAreas){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedAreas });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Areas in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAreas = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedAreas = await deleteDependentService.countAreas(query);
      if (!countedAreas) {
        return res.recordNotFound();
      }
      return res.success({ data: countedAreas });            
    }
    let deletedAreas = await deleteDependentService.deleteAreas(query);
    if (!deletedAreas) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedAreas });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Areas from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Areas.
 * @return {Object} : number of deactivated documents of Areas. {status, message, data}
 */
const softDeleteManyAreas = async (req, res) => {
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
    let updatedAreas = await deleteDependentService.softDeleteAreas(query, updateBody);
    if (!updatedAreas) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedAreas });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAreas,
  bulkInsertAreas,
  findAllAreas,
  getAreas,
  getAreasCount,
  updateAreas,
  bulkUpdateAreas,
  partialUpdateAreas,
  softDeleteAreas,
  deleteAreas,
  deleteManyAreas,
  softDeleteManyAreas,
};
